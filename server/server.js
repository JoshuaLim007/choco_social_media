const express = require('express');
const app = express();
const port = 3012;
const mysql = require('mysql');
const path = require('path');

const databaseInfo = require('../sensitive.json');

function CreateMessage(messageType, content){
    var data = {
        'type': messageType,
        'content': content
    };
    var JSONdata = JSON.stringify(data);
    return JSONdata;
}

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
        res.send(CreateMessage('load', results));
    });
})
app.get('/posts/edit/:post_id',(req, res) => {
    //console.log("Grabbing post table");
    res.sendFile('edit_post.html', {root: publicDir});
    /*
    con.query(`SELECT * FROM post WHERE id = ${req.params.post_id};`, function(err, results, fields){
        if(err) console.log(err);
        res.send(CreateMessage('load', results));
    });
    */
})
app.get('/posts/edit/grab_data/:post_id',(req, res) => {
    //console.log("Grabbing post table");
    con.query(`SELECT * FROM post WHERE id = ${req.params.post_id};`, function(err, results, fields){
        if(err) console.log(err);
        res.send(CreateMessage('load', results));
    });
})
app.post('/posts/createPost/:userId/:text/:date', (req,res)=>{
    con.query(`INSERT INTO post (date, text, user_id) VALUES ('${req.params.date}', '${req.params.text}', '${req.params.userId}');`, function(err, results, fields){
        if(err) {
            res.send(CreateMessage('error', err.sqlMessage));
        }
        else 
            console.log("creating a new post");
    });
})
app.post('/posts/deletePost/:postId', (req,res)=>{
    console.log("deleting post: " + req.params.postId);
    con.query(`DELETE FROM likes_post WHERE post_id = ${req.params.postId}`, function(err, results, fields){
        if(err) {
            console.log(err.sqlMessage);
            res.send(CreateMessage('error', err.sqlMessage));
        }
        else 
            console.log("deleting a likes related to this post");
    });
    con.query(`DELETE FROM hashtag_post WHERE post_id = ${req.params.postId}`, function(err, results, fields){
        if(err) {
            console.log(err.sqlMessage);
            res.send(CreateMessage('error', err.sqlMessage));
        }
        else 
            console.log("deleting a hashtags related to this post");
    });
    con.query(`DELETE FROM post WHERE id = ${req.params.postId};`, function(err, results, fields){
        if(err) {
            console.log(err.sqlMessage);
            res.send(CreateMessage('error', err.sqlMessage));
        }
        else 
            res.send(CreateMessage('load', 'hello'));
            console.log("deleting a new post");
    });
})


//send html page
app.get('/hashtags', (req, res) => {
    res.sendFile('all_hashtags.html', {root: publicDir});
})
//get hashtags
app.get('/hashtags/grabData', (req, res) => {
    console.log("Grabbing hastags");

    con.query("SELECT id, name FROM hashtag;", function(err, results, fields){
        if(err) console.log(err);
        res.send(CreateMessage('load', results));
    });
})


//send users page html
app.get('/users', (req, res) => {
    res.sendFile('all_accounts.html', {root: publicDir});
})
//get all users
app.get('/users/grabData', (req, res) => {
    console.log("Grabbing user table");

    con.query("SELECT id, email, password, display_name FROM user;", function(err, results, fields){
        if(err) console.log(err);
        res.send(CreateMessage('load', results));
    });
})
//get user name based on user id
app.get('/users/grabUserName/:userId', (req, res) => {
    con.query(`SELECT display_name FROM user WHERE id = ${req.params.userId};`, function(err, results, fields){
        if(err) {
            console.log(err);
            res.send(CreateMessage('error', null));
        }
        else
            res.send(CreateMessage('load', results));
    });
})
//create a user into the database
app.post('/users/createUser/:username/:email/:password', (req,res)=>{
    con.query(`INSERT INTO user (email, password, display_name) VALUES (${req.params.email}, ${req.params.password}, ${req.params.username});
    `, function(err, results, fields){
        if(err) {
            res.send(CreateMessage('error', err.sqlMessage));
        }
        else 
            console.log("creating a new post");
    });
})
//create a user into the database
app.post('/users/deleteUser/:userId', (req,res)=>{
    console.log("deleting");
    con.query(`DELETE FROM likes_post WHERE user_id = ${req.params.userId};`, function(err, results, fields){
        if(err) {
            res.send(CreateMessage('error', err.sqlMessage));
        }
    });
    con.query(`DELETE FROM relationship WHERE user_id = ${req.params.userId};`, function(err, results, fields){
        if(err) {
            res.send(CreateMessage('error', err.sqlMessage));
        }
    });
    con.query(`DELETE FROM relationship WHERE follow_id = ${req.params.userId};`, function(err, results, fields){
        if(err) {
            res.send(CreateMessage('error', err.sqlMessage));
        }
    });
    con.query(`DELETE FROM post WHERE user_id = ${req.params.userId};`, function(err, results, fields){
        if(err) {
            res.send(CreateMessage('error', err.sqlMessage));
        }
    });
    con.query(`DELETE FROM user WHERE id = ${req.params.userId};`, function(err, results, fields){
        if(err) {
            res.send(CreateMessage('error', err.sqlMessage));
        }
        else{
            res.send(CreateMessage('load', 'gabagoo'));
        }
    });
})


app.get('/', (req, res) => {
    res.redirect('/posts');
    console.log("REDIRECT");
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})