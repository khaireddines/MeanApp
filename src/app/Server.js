const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
const col = "contacts";
var db

mongoClient.connect('mongodb://localhost:27017', (err, database) => {
  if (err) return console.log(err);
  db = database.db("contact")
  app.listen(3000, () => {
    console.log("listening on 3000");
  })
});

app.get('/api/contacts', (req, res) => {

  db.collection(col).find().toArray((err, result) => {
    if (err) return console.log(err);
    res.status(200).json(result);
  });
});

app.post('/api/contacts', (req, res) => {

  db.collection(col).insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    res.status(201).json(result);
  })
});

app.get('/api/contacts/:id', (req, res) => {

  db.collection(col).findOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) return console.log(err);
    res.status(200).json(result);
  })
});

app.put('/api/contacts/:id', (req, res) => {
  var updateDoc = req.body;
  console.log(updateDoc);
  delete updateDoc._id;
  db.collection(col).updateOne({ _id: new ObjectID(req.params.id) }, { $set: updateDoc }, (err, result) => {
    if (err) return console.log(err);
    updateDoc._id = req.params.id;
    res.status(200).json(updateDoc);
  })
});

app.delete('/api/contacts/:id', (req, res) => {
  db.collection(col).deleteOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) return console.log(err);
    res.status(200).json(req.params.id);

  })
});




