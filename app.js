//jshint esversion:6
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true

}));
app.set("view engine", "ejs");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userDB");

const {Schema, model} = mongoose;

const userSchema = new Schema({
  email: String,
  password: String
}, {collection: "users"});

const User = model("User", userSchema);

///////////////////////// Get Methods //////////////////////////

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});



///////////////////////// Post Methods //////////////////////////

app.post("/register", function(req, res){

  const username = req.body.username;
  const password = req.body.password;

  const user = new User({
    email: username,
    password: password
  });

  user.save();

  res.render("secrets");
});


app.post("/login", function(req, res){

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err){
      res.render(err);
    }else{
      if (foundUser.password === password){
        res.render("secrets");
      }
    }
  });


});

///////////////////////// Listen to Port //////////////////////////

app.listen(3000,function(){
  console.log("Server started on port 3000.");
})
