var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Message = require('../models/message');

var User = require('../models/user');


router.get('/',function(req,res,next) {
    Message.find()
        .populate('user','firstName')
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'Eror occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Saved',
                obj: messages
            });
        });
});

router.use('/',function (req,res,next) {
    jwt.verify(req.query.token,'secret',function (err,decoded) {
        if(err){
            return res.status(401).json({
                title: 'Not authenticated',
                error: err
            })
        }
        next();
    })
})

router.post('/',function (req,res,next) {

    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id,function(err,user){
        if(err){
            return res.status(500).json({
                title: 'Eror occured',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user
        });

        message.save(function (err,result) {
            if(err){
                return res.status(500).json({
                    title: 'Eror occured',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved',
                obj: result
            });
        });
    })


});

router.patch('/:id',function (req,res,next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id,function (err,message) {
        if(err){
            return res.status(500).json({
                title: 'Error occured',
                error: err
            });
        }
        if (!message){
            return res.status(500).json({
                title: 'No message',
                error: {
                    message: 'Message not found'
                }
            });
        }
        if (message.user != decoded.user._id){
            return res.status(500).json({
                title: 'Wrong user',
                error: { message: 'This user doesnt have access to edit this message'}
            });
        }

        message.content = req.body.content;
        message.save(function(err,result){
            if(err){
                return res.status(500).json({
                    title: 'Error occured',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Message updated',
                obj: result
            })
        })
    })
})

router.delete('/:id',function(req,res,next){
    var decoded = jwt.decode(req.query.token);

    Message.findById(req.params.id,function(err,message){
        if(err){
            return res.status(500).json({
                title: '',
                error:err
            })
        }
        if(!message){
            return res.status(500).json({
                title: '',
                error: ''
            })
        }
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Wrong user',
                error: {message: 'This user doesnt have access to edit this message'}
            })
        }

        message.remove(function(err,result){
            if(err){
                return res.status(500).json({
                    title: 'Error occured',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Message deleted',
                obj: result
            })
        })
    })
})
module.exports = router;