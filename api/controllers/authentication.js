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

    //TODO: Check if the username/HAT url and password exists If NOT then return 400 bad request

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    console.log("This is a test " + req.body.name);

    console.log("Password ============ " + req.body.password);


    //Hash passwords
    user.setPassword(req.body.password);

    //TODO: Validation check i.e. Valid email and number
    //Send email (and mobile number, where applicable) after registration

    //sendComms.sendCommunication(req.body.email, req.body.name);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
        console.log(token);
    });


};

//TODO: Retrieve profile data from HAT and store it in Owner DB
//TODO: Call the Data provider service to call the HAT



//TODO: Retrieve plugs from HAT and store it to user's record in OwnerDB
//TODO: Call the Data provider service to call the HAT



module.exports.login = function(req, res) {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }
    console.log("Login password: =========== " + req.body.password);
    passport.authenticate('local', function(err, user, info) {
        var token;

        console.log(user);


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