const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 8080;
const authRoute = require('./routes/auth-route');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/shop1', (err)=>{
    if (err) {
        console.log("Database is not connected...");
    }else{
        console.log("Database Connection established");
    }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());
app.use(cors())
app.use('/auth', authRoute);

app.get('/', (req, res) => {
    res.send("Welcome to the server!!!")
})
app.listen(port, ()=>{
console.log("Node server is connected to port " + port);

})

