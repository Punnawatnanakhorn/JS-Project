require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs')

const authRoute=require('./routes/auth');


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))

app.get('/', (req, res) => {
    res.render('../display/index');
});

app.get('/login',(req,res)=>{
    res.render('../display/login');
});

app.get('/register',(req,res)=>{
  res.render('../display/register');
});


app.use(express.json());

app.use('/api/user',authRoute);



app.post('/register',async(req,res)=>{
  const user=new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  });
  user.save();
  res.redirect('/register');
});

app.listen(3000, () => console.log('Server Started'))