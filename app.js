
const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const mongoose=require('mongoose');
const app=express();

mongoose.connect('mongodb://localhost:27017/userDB',{useNewUrlParser:true,useUnifiedTopology: true });
const userSchema=new mongoose.Schema({
    email:{type:String},
    password:{type:String}
});
const User=new mongoose.model('User',userSchema);

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));



app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.get('/register',(req,res)=>{
    res.render('register');
})
app.post('/register',(req,res)=>{
console.log(req.body.username);
  const newUser=new User({
      email:req.body.username,
      password:req.body.password
  })
  newUser.save((err)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log('user added');
          res.render('secrets');
      }
  })


});
app.post('/login',(req,res)=>{

     const username=req.body.username;
     const password=req.body.password;

     User.findOne({email:username}).then((user)=>{
         if(user){
             if(user.password===password)
               {
                   return res.render('secrets');
               }
               else{
                console.log("Invalid");
                return res.redirect('/login');
            }
              
              
         }
         else{
             console.log("Invalid");
             return res.redirect('/login');
         }
     }).catch(err=>{
        console.log("Invalid");
         console.log(err);
     })
})
app.listen(8080,(err)=>{
    if(err)
    console.log(err)
    else
    console.log('Server set up on port 8080');
});