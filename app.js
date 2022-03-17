const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const { urlencoded } = require("express");

mongoose
  .connect(process.env.URL)
  .then(() => console.log("db connected"))
  .catch((e) => {
    console.log("Something went Wrong");
    console.log(e);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded({ extended: true }));
const Schema = require("./models/schema");

app.get("/", (req, res) => {
  res.render("register");
});
app.post("/signUp", async (req, res) => {
  const { email,username,password } = req.body;
  console.log(req.body);
  if ((await Schema.find({ email: email,username:username,password:password})).length === 0) {
    const newDetail = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    await Schema.create(newDetail);

    res.send(
      `<script>alert("You have signed-up. You can login now."); window.location.href = "/login"; </script>`
    );
  }else {
    res.send(
      '<script>alert("You have already signed-up.Login now."); window.location.href = "/login"; </script>'
    );
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
    const { username,email,password } = req.body;
    console.log(req.body);
    if ((await Schema.find({ email: email,username:username})).length !== 0) {
        if((await Schema.find({email: email,username:username,password:password})).length === 0){
            res.send('<script>alert("Incorrect password"); window.location.href = "/"; </script>');
        }
        else{
            res.send(
                `<script>alert("Welcome ${username}"); window.location.href = "/"; </script>`
              );
        }
    }else {
        res.send('<script>alert("You need to to sign-up first"); window.location.href = "/"; </script>');
    }
  });

const port=process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
