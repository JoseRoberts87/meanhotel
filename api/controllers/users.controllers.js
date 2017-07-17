var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register = function(req, res){
    console.log('registering user');

    var username = req.body.username;
    var name = req.body.name;
    var password = req.body.password;

    User.create({
        username: username,
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function(err, user){
        if(err){
            console.log(err);
            res
            .status(400)
            .json(err);
        }else{
            console.log('user created');
            res
            .status(201)
            .json(user);
        }
    });

};

module.exports.login= function(req,res){
    console.log('loggin user');
    var username = req.body.username;
    var password = req.body.password;

    console.log('here');

    User.findOne({
        username: username
    }).exec(function(err, user){
        if (err){
            console.log(err);
            res
            .status(400)
            .json(err);
        }else{
            if(bcrypt.compareSync(password, user.password)){
                console.log('welcome', user);
                var token = jwt.sign({username: user.username}, 's3cr3t', {expiresIn: 3600});
                res
                .status(200)
                .json({success: true, token: token});
            }else{
                res
                .status(401)
                .json('unauthorized');
            }
        }
    });
};

module.exports.authenticate = function(req, res, next){
    var headerExists = req.headers.authorization;
    if(headerExists){
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 's3cr3t', function(err, decode){
            if (err){
                console.log('auth failed');
                res
                .status(401)
                .json('auth failed');
            }else{
                req.user = decode.username;
                next()
            }
        });
    }else{
        res
        .status(403)
        .json('token not found');
    }

};