//import the Express package
const express = require('express');
const bodyParser = require('body-parser');
const TestKit = require('./models/testKit');
const TestCentre = require('./models/testCentre');
const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
const User = require("./models/user");
const jwt = require('jsonwebtoken');
const checkAuth = require('./middleware/check-auth');

//Add one route
//Use express function and save as an app constant
const app = express()

mongoose.connect("mongodb+srv://sadip:f1b0X2jNrfnxnNF0@cluster0.hlfhy.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.post("/api/testkits", (req, res, next) => {
  const testKit = new TestKit({
    testKitName: req.body.testkitname,
    testKitStock: req.body.testkitstock
  })

  testKit.save().then(createdTestKit => {
    console.log(testKit)
    res.status(200).json({
      message: 'Test Kit added successfully',
      testKitId: createdTestKit._id
    });
  });

  console.log(testKit);
  res.status(201).json({
    message: 'Test Kit added successfully'
  });
});

app.put("/api/testkits/:id", (req, res, next) => {
  const testKit = new TestKit({
    _id: req.body.id,
    testKitName: req.body.testkitname,
    testKitStock: req.body.testkitstock
  });
  TestKit.updateOne({ _id: req.params.id}, testKit).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

app.get('/api/testkits',(req, res, next)=>{
  TestKit.find().then(documents => {
    res.status(200).json({
      message: 'Test Kit fetched successfully',
      testKits: documents
    });
  });
});

app.delete('/api/testkits/:id', (req, res, next) => {
  TestKit.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Deleted"});
  })
});

//Test Centre
 app.post("/api/testcentres",(req, res, next) => {
   const testCentre = new TestCentre({
     TestCentreName: req.body.testcentrename
   })

   testCentre.save().then(createdTestCentre => {
     console.log(testCentre)
     res.status(200).json({
       message: 'Test Centre added successfully',
       testCentreId: createdTestCentre._id
     });
   });

   console.log(testCentre);
   res.status(201).json({
     message: 'Test Centre added successfully'
   });

   console.log(req.body.testcentrename);
 });

 app.get('/api/testcentres',(req, res, next)=>{
  TestCentre.find().then(documents => {
    res.status(200).json({
      message: 'Test Centre fetched successfully',
      testCentres: documents
    });
  });
});

//login signup
app.post('/api/user/signup', (req,res,next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
    const user = new User({
      username: req.body.username,
      password: hash,
      name: req.body.name,
      position: req.body.position
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'Test Centre Officer profile created',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error:err
      });
    });
  });
});

app.post('/api/user/login', (req,res,next) => {
  let fetchedUser;
  User.findOne({username: req.body.username})
  .then(user => {
    if (!user){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    fetchedUser = user
    return bcrypt.compare(req.body.password, user.password)
  })
  .then(result => {
    if (!result){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    const token = jwt.sign(
      {username: fetchedUser.username, userId: fetchedUser._id},
      'secret_this_should_be_longer',
      {expiresIn: '1h'}
    );
    res.status(200).json({
      token: token
    })
  })
  .catch (err=> {
    return res.status(401).json({
      message: 'Auth failed'
    });
  })
})

module.exports = app;
