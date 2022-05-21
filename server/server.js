const express = require('express');
const app = express();
const port = 3012;
const mysql = require('mysql');
const path = require('path');

const databaseInfo = require('../sensitive.json');

console.log(databaseInfo);
var con = mysql.createConnection({
    host: databaseInfo.host,
    user: databaseInfo.username,
    password: databaseInfo.password,
    database: databaseInfo.database
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
app.post('/posts/createPost/:userId/:text/:date', (req,res)=>{
    console.log("creating a new post");

    con.query(`INSERT INTO post (date, text, user_id) VALUES ('${req.params.date}', '${req.params.text}', '${req.params.userId}');`, function(err, results, fields){
        if(err) console.log(err.sqlMessage);
        var JSONdata = JSON.stringify(results);
        res.send(JSONdata);
   });

    res.end();
})



app.get('/hashtags', (req, res) => {
    res.sendFile('hashtag2.html', {root: publicDir});
    console.log("Grabbing hashtags table");
})


app.get('/users', (req, res) => {
    res.sendFile('users.html', {root: publicDir});
})
app.get('/users/grabData', (req, res) => {

})
app.post('/users/createUser/:userId/:username/:email/:password', (req,res)=>{

})



app.get('/', (req, res) => {
    res.redirect('/posts');
    console.log("REDIRECT");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})