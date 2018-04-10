var express=require('express');
var router=express.Router();

let Article=require('../models/articles');

router.get('/add', function(req,res){
    res.render('add_articles' , {
        title:'Add Articles'
    });
});

router.post('/add',function(req,res){
    let article=new Article();
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;

    article.save(function(err){
     if(err){
        console.log(err);
     }
     else
     {
        req.flash('success','Article Added');
        res.redirect('/');
     }
    });
});

router.get('/edit/:id',function(req,res){
    Article.findById(req.params.id , function(err,article){
        res.render('edit_article',{
            title:'Edit Articles',
            article:article
        });
    });
});

router.post('/edit/:id',function(req,res){
    req.checkBody('title','Title is required').notEmpty();
    req.checkBody('author','Author is required').notEmpty();
    req.checkBody('body','Body is required').notEmpty();

    let errors=req.validationErrors();

    if(errors){
    res.render('add_articles',{
        title:'Add Article',
        errors:errors
    });
    } 
    else{
     let article={};
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;

    let query = {_id:req.params.id}

    Article.update(query,article,function(err){
     if(err){
        console.log(err);
     }
     else
     {
        req.flash('success','Article Edited');
        res.redirect('/');
     }
    });
    }
});

router.get('/:id',function(req,res){
    Article.findById(req.params.id , function(err,article){
        res.render('article',{
            article:article
        });
    });
});

module.exports=router;