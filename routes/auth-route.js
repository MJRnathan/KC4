const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

router.post('/register', (req, res)=>{
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            return res.json({success: false, message:"Hash Error!"})
        }else{
            const user = new User({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                phone:req.body.phone,
                add_to_telegram:req.body.add_to_telegram,
                subscription_valid_from:req.body.subscription_valid_from,
                subscription_valid_upto:req.body.subscription_valid_upto,
                // place_holder1:req.body.placeholder1,
                // place_holder2:req.body.placeholder2,
                email:req.body.email,
                password: hash,
        })
            user.save()
            .then((_)=>{
                res.json({success:true, message:"Account has been Created."})
            })
            .catch((err)=>{
                if (err.code === 11000){
                    return res.status(409).json({success:false, message:"Email already exists"})
                }
                res.status(500).json({success:false, message:"Authentication Failed."})
            })
        }
    })
});

router.post('/login', (req, res)=>{
    User.find({email:req.body.email}).exec().then((result)=>{
        if(result.length < 1){
            return res.json({success:false, message:"User not found."})
        }
        const user = result[0];
        bcrypt.compare(req.body.password, user.password, (err, ret)=>{
            if(ret){
                const payload = {
                    userId: user._id
                }
                const token = jwt.sign(payload, "webBatch")
                return res.json({success:true, token:token, message:"Login Successful."})
            }else{
                return res.json({success:false, message:"Wrong Password."})
            }
        })
    }).catch(err=>{
        res.json({success: false, message:"Authentication Failed"})
    })
})

router.get('/profile', checkAuth, (req, res)=>{
    const userId = req.userData.userId;
    User.findById(userId).exec().then((result)=>{
        res.json({success:true, data:result})
    }).catch(err=>{
        res.json({success:false, message:"server Error"})
    })
})

module.exports = router
