var express=require('express');
var app=express();
var path=require('path');
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var session=require('express-session');
var expressValidator=require('express-validator');
var flash=require('connect-flash');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(expressValidator({
    errorFormatter:function(param,msg,value){
        var namespace=param.split('.'),
        root=namespace.shift(),
        formParam=root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param:formParam,
            msg:msg,
            value:value
        };
    }
}));

mongoose.connect('mongodb://localhost/dbfirst');
let db=mongoose.connection;


db.once('open',function(){
    console.log('connect to mongodb');
});

db.on('error',function(err){
    console.log(err);
});

let Article=require('./models/articles');

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.get('/',function(req,res){
    Article.find({},function(err,articles){
        if(err){
            console.log(err);
        }
        else{
             res.render('index' , {

        title:'Articles',
        articless:articles

    });

        }
    

  });
    
});

let articles=require('./routes/articles');
app.use('/articles',articles);



app.listen(8080, function(){
    console.log("Open Port:8080");
    
});