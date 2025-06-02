const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
let db;
let users;
async function connectDB() {
    try{
        await client.connect();
        db = client.db('mydatabase');
        users = db.collection('users');
        console.log("Connected to MongoDB");
        return users;
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err);
        throw err; // Rethrow the error to be handled by the caller
    }
}


module.exports = {connectDB};
