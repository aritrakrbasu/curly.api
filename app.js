const express = require('express');
const morgan = require('morgan');//log register
const bodyParser = require('body-parser');//url body parse
const router =express.Router();
const app =express();



const Article = require('./articles');
const Updatedata = require('./updatedata');

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
app.use('/updatedata',Updatedata);
app.use('/', router);


router.get('/:anything',(req,res,next) => {
    const anything=req.params.anything;
    const error= ({message:"Page Not Found",anything:anything,error_code:"404"});
        next(error);


});
    app.use((error,req,res,next)=>{
        res.status(error.status || 500);
        res.json({ 
                Error_Code: error.error_code,
                Url_requested:error.anything,
                Error: error.message,
               
                
            }
        );
    });
    module.exports = app ;
