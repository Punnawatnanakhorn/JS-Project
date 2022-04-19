const router=require('express').Router();
const User=require('../models/User');

app.post('/register',async(req,res)=>{
    res.send('This is fine');
});

module.exports=router;