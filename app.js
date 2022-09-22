const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const homeStartingContent = 'A blog (a truncation of "weblog") is a discussion or informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order so that the most recent post appears first, at the top of the web page. Until 2009, blogs were usually the work of a single individual, occasionally of a small group, and often covered a single subject or topic. In the 2010s, "multi-author blogs" (MABs) emerged, featuring the writing of multiple authors and sometimes professionally edited. MABs from newspapers, other media outlets, universities, think tanks, advocacy groups,and similar institutions account for an increasing quantity of blog traffic. The rise of Twitter and other "microblogging" systems helps integrate MABs and single-author blogs into the news media. Blog can also be used as a verb, meaning to maintain or add content to a blog. ';
const _ = require('lodash');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var posts=[];
var flag=0;
var ctittle=" ";
var cpost=" ";
app.get('/',function(req,res){
  
res.render(__dirname+"/views/home.ejs",{tittle:"Blog",homecontent:homeStartingContent,postshere:posts});
});

app.get("/login",function(req,res){
  res.render(__dirname+"/views/login.ejs",{msg:""});
  });
  app.post("/login",function(req,res){
     const id=req.body.id;
     const passward=req.body.pass;
     if(id === "admin@gmail.com" && passward === "123"){
      res.render(__dirname+"/views/compose.ejs",{tittle:"Compose"});
     }
     else{
      res.render(__dirname+"/views/login.ejs",{msg:"* Login faild try again to continue! "});}
    
    });
  
  app.get("/contact",function(req,res){
   
    res.render(__dirname+"/views/contact.ejs");
    });
app.post('/',function(req,res){
var post={
  tittle:req.body.composetittle,
  post:req.body.composepost
}
posts.push(post);
res.redirect('/');
});


app.get("/post/:postname",function(req,res){
const postPage=  _.lowerCase(req.params.postname );

posts.forEach(function(e){

var tittles=_.lowerCase(e.tittle);
if(tittles === postPage ){
  flag=1;
  ctittle=e.tittle;
  cpost=e.post;
  }
else{ }
});
if(flag=== 1){                
res.render("post",{posttittle:ctittle,postbody:cpost} );}
else{
res.redirect('/');
}

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
