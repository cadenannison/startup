try { require('dotenv').config(); } catch {}

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database');
const http = require('http');
const { peerProxy } = require('./peerProxy');

const app = express();
const authCookieName = 'rap_token';

const port =
  (process.env.PORT && Number(process.env.PORT)) ||
  (process.argv.length > 2 ? parseInt(process.argv[2], 10) : 4000);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
  if (field === 'email') return DB.getUserByEmail(value);
  if (field === 'token') return DB.getUserByToken(value);
  return null;
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  await DB.createUser(user);
  return user;
}

async function updateUserToken(email, token) {
  const user = await DB.getUserByEmail(email);
  if (!user) return;
  user.token = token;
  await DB.updateUser(user);
}

function requireAuth(req, res, next) {
  const token = req.cookies[authCookieName];
  DB.getUserByToken(token).then((user) => {
    if (!user) return res.status(401).send({ msg: 'Unauthorized' });
    req.user = user;
    next();
  }).catch(() => res.status(500).send({ msg: 'Server error' }));
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
    const newToken = uuid.v4();
    await updateUserToken(user.email, newToken);
    setAuthCookie(res, newToken);
    return res.send({ email: user.email });
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

api.delete('/auth/logout', async (req, res) => {
  const token = req.cookies[authCookieName];
  const user = await findUser('token', token);
  if (user) await updateUserToken(user.email, undefined);
  res.clearCookie(authCookieName);
  res.status(204).end();
});

api.get('/profile', requireAuth, (req, res) => {
  res.send({ email: req.user.email });
});

api.get('/activities', async (_req, res) => {
  try {
    const list = await DB.listActivities();
    res.send(list);
  } catch {
    res.status(500).send({ msg: 'Failed to load activities' });
  }
});

api.post('/activities', requireAuth, async (req, res) => {
  const { id, location, text, comment, username, createdAt } = req.body || {};
  if (!id || !location || !text || !username || !createdAt) {
    return res.status(400).send({ msg: 'Invalid activity' });
  }
  try {
    await DB.addActivity({ id, location, text, comment, username, createdAt });
    res.status(201).send(req.body);
  } catch {
    res.status(500).send({ msg: 'Failed to add activity' });
  }
});

api.delete('/activities/:id', requireAuth, async (req, res) => {
  try {
    const removed = await DB.deleteActivity(req.params.id);
    res.status(removed ? 204 : 404).end();
  } catch {
    res.status(500).send({ msg: 'Failed to delete activity' });
  }
});

app.use((err, _req, res, _next) => {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

const server = http.createServer(app);
peerProxy(server);
server.listen(port, () => {
  console.log(`Rise & Play service listening on ${port}`);
});

