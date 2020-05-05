const express = require('express');
const data = require('./curldetails');


const router =express.Router();

//Returns a random number between min (inclusive) and max (exclusive)

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }


//request data without data limit - always show 1 data
router.get('/',(req,res,next) => {
    const rand=between('0',(data.length-1));
    const datalimit=((rand - 0)+1);
    res.status(200).json ({
        data:data.slice(rand,datalimit)
    })
});


//request data with limit - Max 50 for now
router.get('/:limit',(req,res,next) => {
    const limit=req.params.limit;
    const rand=between('0',(data.length-limit));
    const datalimit=((rand - 0)+(limit-0));
    res.status(200).json ({
        data:data.slice(rand,datalimit),
    })
});

module.exports =router;