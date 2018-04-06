var express=require('express');
var app=express();
var sessions=require('express-session');
var bodyParser=require('body-parser');

var session;

app.use(bodyParser.json());
app.use(sessions({
	secret:'@#%$%CGJGHJGH'
}))
app.use(express.static(__dirname + '/public'));/*css file*/
app.get('/login' , function(req , res) {
	res.sendFile('public/files/login.html',{root:__dirname});
});

app.get('/loginOp' , function(req,res){
	//res.end(JSON.stringify(req.body));get
	
	session=req.session;
	console.log(session);
	var name=req.query.username;
	var pass=req.query.pass;
    console.log(JSON.stringify(req.query));
	console.log("name is:"+name+ pass);
	if(name == 'admin' && pass == 'admin'){
		console.log("message");
		session.UniqueID=req.query.username;
		res.redirect('/redirects');
	}
	else{
		res.send(req.session.UniqueID +'Who r u?');
	}
	
	
});

app.get('/admin' , function(req,res){
	res.end('you are admin');
});

app.get('/redirects' , function(req,res){
	session=req.session;
	if(session.UniqueID == 'admin'){
		console.log(session.UniqueID);
		res.redirect('/admin');
	}
		
	
});

app.listen(3000, function(){
	console.log("Open Port 3000");
	
});