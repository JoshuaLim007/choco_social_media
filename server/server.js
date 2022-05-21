const express = require('express');
const app = express();
const port = 8080;
const mysql = require('mysql');
const path = require('path');

// app.use(express.static('public'));

var con = mysql.createConnection({
    host: "localhost",
    user: "123",
    password: "123"
  });

con.connect(function(err){
    if(err) throw err;
    console.log("sql connected");
    con.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
})

app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    console.log("Grabbing posts table");
})
app.get('/hashtags', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/hashtag2.html'));
    console.log("Grabbing hashtags table");
})
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/users.html'));
    console.log("Grabbing users table");
})
app.get('*', (req, res) => {
    console.log('redirecting');
    res.redirect('/posts');
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
 })

