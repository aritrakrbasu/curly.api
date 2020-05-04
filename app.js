const express = require('express');
const morgan = require('morgan');//log register
const bodyParser = require('body-parser');//url body parse

const app =express();



const Article = require('./articles');

//CORS error handling

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','POST,GET');
        return res.status(200).json({});
    }
    next();
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//All Routes
app.use('/article', Article);



    //error handling
    app.use('/',(req,res,next) => {
        const error= new Error('Not Found');
        error.status=404;
        next(error);
    });
    
    app.use((error,req,res,next)=>{
        res.status(error.status || 500);
        res.json({
            error:{
                message: error.message
            }
        });
    });
    module.exports = app ;
