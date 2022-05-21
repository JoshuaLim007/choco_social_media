const express = require('express');
const app = express();
const port = 3012;
const mysql = require('mysql');
const path = require('path');




var con = mysql.createConnection({
    host: "classmysql.engr.oregonstate.edu",
    user: "cs340_limjos",
    password: "6259",
    database: "cs340_limjos"
  });

con.connect(function(err){
    if(err) console.log(err);
    console.log("sql connected");
})

app.get('/posts', (req, res) => {
    console.log("Grabbing posts table");

    con.query("SELECT id, date, text, user_id FROM post", function(err, results, fields){
        if(err) console.log(err);
        //res.json(results);
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
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


 app.use(express.static('public'))

 app.listen(port, () => {
    console.log(`App listening on port ${port}`);
 })