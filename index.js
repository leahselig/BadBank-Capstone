// Requirements for the node app
var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

// Used to serve the static files from the public directory
app.use(express.static('public'));
app.use(cors());

// Adding the route definition for creating new users (now with the database)
app.get('/account/create/:name/:email/:password/:userID', function(req, res){
    dal.create(req.params.name, req.params.email, req.params.password, req.params.userID)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// Adding the route definition for getting the user info
app.get('/account/getbalance/:userID', function(req, res){
    dal.getBalance(req.params.userID)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// Adding the route definition for updating the user balance
app.get('/account/changebalance/:userID/:newBalance', function(req, res){
    dal.changeBalance(req.params.userID, req.params.newBalance)
        .then((result) => {
            console.log(result);
            res.send(result);
        });
});

// Adding the route definition for updating the user activity
app.get('/account/changeactivity/:userID/:activityDate/:activityTime/:activityType/:activityAmount/:activityBalance', function(req, res){
    dal.updateActivity(req.params.userID, req.params.activityDate, req.params.activityTime, req.params.activityType, req.params.activityAmount, req.params.activityBalance)
        .then((result) => {
            console.log(result);
            res.send(result);
        });
});

// Adding the route definition for returning all account data (now with the database)
app.get('/account/all', function(req, res){
    dal.all()
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

// Listening for the port
var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);