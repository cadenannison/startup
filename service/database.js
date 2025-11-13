const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('riseandplay');
const users = db.collection('users');
const activities = db.collection('activities');

(async function init() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}/riseandplay`);
    await users.createIndex({ email: 1 }, { unique: true });
    await activities.createIndex({ createdAt: -1 });
  } catch (ex) {
    console.error(`Mongo connection failed: ${ex.message}`);
    process.exit(1);
  }
})();

async function getUserByEmail(email) {
  if (!email) return null;
  return users.findOne({ email });
}

async function getUserByToken(token) {
  if (!token) return null;
  return users.findOne({ token });
}

async function createUser(user) {
  await users.insertOne(user);
  return user;
}

async function updateUser(user) {
  await users.updateOne({ email: user.email }, { $set: user });
  return user;
}

async function listActivities() {
  return activities.find({}, { sort: { createdAt: -1 } }).toArray();
}

async function addActivity(activity) {
  await activities.insertOne(activity);
  return activity;
}

async function deleteActivity(id) {
  const result = await activities.deleteOne({ id });
  return result.deletedCount > 0;
}

module.exports = {
  getUserByEmail,
  getUserByToken,
  createUser,
  updateUser,
  listActivities,
  addActivity,
  deleteActivity,
};
