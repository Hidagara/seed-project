var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../models/user');

router.post('/',function(req,res,next){
    var user = new User({
        firstName:  req.body.firstName,
        lastName:  req.body.lastName,
        password:  req.body.password,//bcrypt.hashSync(req.body.password,10),
        email:    req.body.email
    });

    user.save(function (err,result) {

        if(err){
            return res.status(500).json({
                title: 'An error',
                error: err
            })
        }
        res.status(200).json({
            message: 'User create',
            obj: result
        });
    });
})

module.exports = router;