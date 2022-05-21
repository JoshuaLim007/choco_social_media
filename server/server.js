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

const publicDir = path.join(__dirname, '../public');
app.use('/public', express.static(publicDir))

app.get('/posts', (req, res) => {
    res.sendFile('index.html', {root: publicDir});
})
app.get('/posts/grabData', (req, res) => {
    console.log("Grabbing posts table");

    con.query("SELECT id, date, text, user_id FROM post", function(err, results, fields){
        if(err) console.log(err);
        var JSONdata = JSON.stringify(results);
        res.send(JSONdata);
    });
})


app.get('/hashtags', (req, res) => {
    res.sendFile('hashtag2.html', {root: publicDir});
    console.log("Grabbing hashtags table");
})
app.get('/users', (req, res) => {
    res.sendFile('users.html', {root: publicDir});
    console.log("Grabbing users table");
})

app.get('/', (req, res) => {
    res.redirect('/posts');
    console.log("REDIRECT");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})