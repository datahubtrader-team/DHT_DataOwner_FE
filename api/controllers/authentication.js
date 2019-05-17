var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var sendComms = require('../outboundAPIclient/apiclient');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    var user = new User();

    //TODO: Check if the username/HAT url and password exists
    //TODO: Retrieve data from HAT and store it in DB
    user.name = req.body.name;
    user.email = req.body.email;

    console.log("This is a test " + req.body.name);

    user.setPassword(req.body.password);

    //Send email (and mobile number, where applicable) after registration
    sendComms.sendCommunication(req.body.email, req.body.name);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });

    });

};

module.exports.login = function(req, res) {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }
    console.log("Login " + req.body.password);
    passport.authenticate('local', function(err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        //TODO: Log into HAT and generate token through the data provider service
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};