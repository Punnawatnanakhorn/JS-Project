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




app.use(express.json());

app.use('/api/user',authRoute);




app.get('/', (req, res) => {
    res.render('../display/index');
});

app.get('/login',(req,res)=>{
    res.render('../display/login')
});

app.get('/register',(req,res)=>{
  res.render('../display/register')
});

app.post("/register", async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });

  if (userFound) {
    req.flash("error", "User with that email already exists");
    res.redirect("/register");
  } else {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      await user.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  }
});



app.listen(3000, () => console.log('Server Started'))