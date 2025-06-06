const express = require('express');
const sign = express.Router();
const Account = require('./Account.js'); // Assuming Account.js exports the Account model



sign.use(express.json()); 

sign.post("/save-name",async(req,res)=>{
    try{
      const {name,pass} = req.body;
      console.log("Received data:", name, pass);

      acc = await Account.findOne({name: name});
      if(acc){
        res.json('User already exists');
        return;
      }
      
      var acc = new Account({name, pass});
      await acc.save();  
      res.json({message: "User saved successfully"});
      acc.hello(); // Call the hello method from Account model
    }
    catch(err){
        console.error("Error saving user:", err);
        res.status(500).json({error: "Failed to save user"});
        return;
    }
})

sign.get("/get-users", async (req, res) => {
    try{
        userList = await Account.find({});
        res.json(userList);
    }
    catch(err){
        console.error("Error fetching users:", err);
        return;
    }
});

sign.delete("/delete-user", async (req, res) => {
    try{
      result = await Account.deleteMany({});
      res.json({message: "All users deleted successfully"});
      return;
    }
    catch(err){
        console.error("Error deleting user:", err);
        return;
    }
});





module.exports = sign;