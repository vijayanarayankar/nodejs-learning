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

app.post('/login' , function(req,res){
	//res.end(JSON.stringify(req.body));
	session=req.session;
	//if(req.body.username == 'admin' && req.body.pass == 'admin'){
		session.UniqueID=req.body.username;
	//}
	
	res.redirect('/redirects');
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
		else{
			res.send(req.session.UniqueID +'Who r u?');
		}
	
});

app.listen(3000, function(){
	console.log("Open Port 3000");
	
});