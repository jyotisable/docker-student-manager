const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path')
const dotenv = require('dotenv');
const { ObjectID } = require('bson');
dotenv.config();
const app = express();

app.set('view engine', 'ejs');
const uri = `${process.env.MONGODB_CONNECTION_STRING}`
// const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/`
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers', 'x-www-form-urlencodedOrigin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, UPDATE, DELETE, OPTIONS');
  next();
})

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  MongoClient.connect(uri)
  .then(async client => {
    var db = client.db('student-manager');
    var result = db.collection('students').find();
    var students = [];
    await result.forEach((i) => { students.push(i) });
    client.close();
    res.render('index', { students: students });
  })
  .catch(err => {
    console.log(err);
    res.render('error', { error: err });
  })
})

app.get('/edit/:id', (req, res, next) => {
  var id = req.params.id;
  MongoClient.connect(uri)
  .then(async client => {
    var db = client.db('student-manager');
    db.collection('students').findOne({ "_id": id }, function(err, result){
      if(err) throw err;
      var deptsResult = db.collection('departments').find();
      var departments = [];
      await deptsResult.forEach((i) => { departments.push(i) });
      if(!result) throw 'NOT_FOUND';
      client.close();
      res.render('form', {student: result, departments: departments});
    });
    
  })
  .catch(err => {
    console.log(err);
    res.render('error', { error: err });
  })
})

app.get('/new', (req, res) => {
  MongoClient.connect(uri)
  .then(async client => {
    var db = client.db('student-manager');
    var deptsResult = db.collection('departments').find();
    var departments = [];
    await deptsResult.forEach((i) => { departments.push(i) });
    if(!deptsResult) throw 'NOT_FOUND';
    client.close();
    res.render('form', {student: null, departments: departments});
  })
  .catch(err => {
    console.log(err);
    res.render('error', { error: err });
  })
})

app.post('/insert', (req, res) => {
  MongoClient.connect(uri)
  .then(async client => {
    var db = client.db('student-manager');
    await db.collection('students').insertOne(
      {
        "name": req.body.name,
        "email": req.body.email,
        "department": req.body.department
      }
    )
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
    res.render('error', { error: err });
  })
})

app.post('/update/:id', (req, res, next) => {
  var id = req.params.id;
  MongoClient.connect(uri)
  .then(async client => {
    var db = client.db('student-manager');
    await db.collection('students').updateOne(
      { "_id": id },
      {
        $set: {
          "name": req.body.name,
          "email": req.body.email,
          "department": req.body.department
        }
      },
      { upsert: false }
    )
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
    res.render('error', { error: err });
  })
})

app.get('/:id', (req, res) => {
  var id = req.params.id;
  MongoClient.connect(uri)
  .then(client => {
    var db = client.db('student-manager');
    db.collection('students').deleteOne({ "_id": id })
    .then(_ => {res.redirect('/');})
    .catch(err => { throw err });
  })
  .catch(err => {
    console.log(err);
    res.render('error', { error: err });
  })
})

module.exports = app;