const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const sign = require('./module/signin.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase');



app.use(express.json());

app.get("/",(req,res)=>{
  res.send(`
    <h1>HOME</h1>
    <div>
      <a href='/signin'>Sign In</a>
    </div>   
    <a href='/signin/get-users'>Get Users</a>`);
});

//database
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  app.use(express.static(path.join(__dirname, 'public')));

});

app.use('/signin', sign);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});