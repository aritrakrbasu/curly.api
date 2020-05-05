 
 const express = require('express');
 const router =express.Router();
 const Dataupdate = require('./data');

 console.log('hi');
 //request data without data limit - always show 1 data
router.get('/start',(req,res,next) => {
    console.log('hi');
    Dataupdate.data.updatedata();
});


module.exports = router ;

 