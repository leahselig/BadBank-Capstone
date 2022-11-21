const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://lselig:Mongoose4@cluster-fullbadbank.vq8ekvy.mongodb.net/?retryWrites=true&w=majority";
let db = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log("Connected successfully to db server");

  // connect to myproject database
  db = client.db("myproject");
});

// Function for creating a user in the mongo database
function create(name, email, password, userID) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, email, password, userID, balance: 0, activity: [] };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

// Get Balance function
function getBalance(userID) {
  return new Promise((resolve, reject) => {
    const customer = db
      .collection("users")
      .find({ userID: userID })
      .toArray(function (err, user) {
        err ? reject(err) : resolve(user);
      });
  });
}

// Change Balance function
function changeBalance(userID, newBalance) {
  return new Promise((resolve, reject) => {
    const customer = db
      .collection("users")
      .updateOne({ userID: userID }, { $set: { balance: newBalance } })
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

// Update Activity Function
function updateActivity(
  userID,
  activityDate,
  activityTime,
  activityType,
  activityAmount,
  activityBalance
) {
  return new Promise((resolve, reject) => {
    const customer = db
      .collection("users")
      .updateOne(
        { userID: userID },
        {
          $push: {
            activity: {
              date: activityDate,
              time: activityTime,
              type: activityType,
              amount: activityAmount,
              balance: activityBalance,
            },
          },
        }
      )
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

// Function for outputting all user data
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

// Exporting the functions to use in the Express App
module.exports = { create, getBalance, changeBalance, updateActivity, all };
