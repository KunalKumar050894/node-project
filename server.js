const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');
app.use((req,res,next)=>{
var now=new Date().toString();
var log=`${now}: ${req.method} ${req.url}`;
 console.log(log);
 fs.appendFile('server.log',log + '\n',(err)=>{
   if(err)
   {
     console.log('Unable to append server.log');
   }
 });
  next();

});
//app.use((req,res,next)=>{
  //res.render('maintainence.hbs');
//});
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.get('/',(request,response)=>{
response.render('home.hbs',{
  pageTitle: 'Home Page',
  welcomemessage: 'Welcome to this website.',
  });
});
app.get('/about',(request,response)=>
{
  response.render('about.hbs',{
    pageTitle: 'About Pagg',
      });
});
app.get('/projects', (req,res)=>{
  res.render('projects.hbs',{
    pageTitle: 'Projects'
  });

});
app.get('/bad',(req,res)=>{
  res.send(
    {
    errorMessage: 'Unable to handle request'
    }
  );
});
app.listen(3000,()=>{
  console.log("Starting server on localhost 3000...")
});
