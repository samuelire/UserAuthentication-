const express = require('express');
const pasth = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');

app.use(express.static("public"));  

app.get("/", (req,res)=>{
  res.render("login");
});

app.get("/login", (req,res)=>{
  res.render("login");
});

app.get("/signup",(req,res)=>{
  res.render("signup");
});

app.post("/signup", async (req,res) => {
  const data = {
    name:req.body.username,
    password:req.body.password
  }

  const existingUser = await collection .findOne({name: data.name});

  if(existingUser){
    res.send("User already exist. Please choose another username")
  }else{
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRound);

    data.password = hashedPassword;

  const userdata = await collection.insertMany(data);
  console.log(userdata);
  }
});

app.post("/login",async(req, res) => {
  try{
    const check = await collection.findOne({name: req.body.username});
    if(!check){
      res.send("user name cannot be found");
    }
    const isPasswordmatch = await bcrypt.compare(req.body.password, check.password);
    if(isPasswordmatch) {
      res.render("home");
    }else{
      req.send("wrong password");

    }

  }catch {
    res.send("wrong Details");
  }
});

const port = 2400;
app.listen(port, () => {
  console.log(`server is running on Port: ${port}`);
})

