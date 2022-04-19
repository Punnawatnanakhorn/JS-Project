require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');



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


app.post('/login',(req,res)=>{
  res.send('Logged in');
});

app.post('/register',(req,res)=>{
  res.send('Register success');
});



app.listen(3000, () => console.log('Server Started'))