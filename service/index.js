const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js'); 
const app = express();
const authCookieName = 'rap_token';

const port = process.argv.length > 2 ? parseInt(process.argv[2], 10) : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

function setAuthCookie(res, authToken) {
  const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: 'strict',
    secure: !isDev,
  });
}

async function findUser(field, value) {
  if (!value) return null;
  return field === 'token' ? DB.getUserByToken(value) : DB.getUserByEmail(value);
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  await DB.createUser(user);
  return user;
}

async function requireAuth(req, res, next) {
  const token = req.cookies[authCookieName];
  const user = await findUser('token', token);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' });
  req.user = user;
  next();
}

const api = express.Router();
app.use('/api', api);

api.get('/health', (_req, res) => res.send({ ok: true }));

api.post('/auth/create', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).send({ msg: 'Email and password required' });

  if (await findUser('email', email)) return res.status(409).send({ msg: 'Existing user' });

  const user = await createUser(email, password);
  setAuthCookie(res, user.token);
  res.status(201).send({ email: user.email });
});

api.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = await findUser('email', email);
  if (user && (await bcrypt.compare(password, user.password))) {
    user.token = uuid.v4();
    await DB.updateUser(user);
    setAuthCookie(res, user.token);
    return res.send({ email: user.email });
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

api.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    await DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

api.get('/activities', async (_req, res) => {
  const list = await DB.listActivities();
  res.send(list);
});

api.post('/activities', requireAuth, async (req, res) => {
  const { id, location, text, comment, username, createdAt, coords } = req.body || {};
  if (!id || !location || !text || !username || !createdAt) {
    return res.status(400).send({ msg: 'Invalid activity' });
  }
  await DB.addActivity({ id, location, text, comment, username, createdAt, coords: coords || null });
  res.status(201).send({ ok: true });
});

api.delete('/activities/:id', requireAuth, async (req, res) => {
  const deleted = await DB.deleteActivity(req.params.id);
  res.status(deleted ? 204 : 404).end();
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Rise & Play service listening on ${port}`);
});
