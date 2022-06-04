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

app.get('/posts/getlikes/:postId', (req,res)=>{
    console.log("Grabbing likes from post");

    con.query(`SELECT u.*
    FROM user u
    JOIN likes_post lp ON lp.post_id = ${req.params.postId}
    WHERE lp.user_id = u.id;`, function(err, results, fields){
        if(err) console.log(err);
        res.send(CreateMessage('load', results));
    });
})

app.get('/posts', (req, res) => {
    console.log(req.params);
    res.sendFile('index.html', {root: publicDir});
})
app.get('/posts/grabData', (req, res) => {
    console.log("Grabbing posts table");

    con.query("SELECT id, date, text, user_id FROM post", function(err, results, fields){
        if(err) console.log(err);
        res.send(CreateMessage('load', results));
    });
})
app.get('/posts/grabData/*', (req, res) => {
    console.log("Grabbing posts table with filters");
    console.log(req.params);

    var filter = req.params['0'].split('&')[0].split('=');
    var type = filter[0];
    var value = filter[1];
    console.log(type);
    console.log(value);

    if(type == 'userId'){
        con.query(`SELECT * FROM post WHERE user_id = ${value};`, function(err, results, fields){
            SendData(res,err,results);
        });
    }
    else if(type == 'hash'){
        con.query(`SELECT p.*
        FROM post p
        JOIN hashtag_post pt ON p.id = pt.post_id
        JOIN hashtag t ON pt.hash_id = t.id
        WHERE t.name = '${value}';`, function(err, results, fields){
            SendData(res,err,results);
        });
    }


})


app.get('/posts/edit/:post_id',(req, res) => {
    res.sendFile('edit_post.html', {root: publicDir});
})
app.post('/posts/edit/:post_id/:text/:date',(req, res) => {

    console.log('updating post data');
    con.query(`UPDATE post
    SET date = '${req.params.date}', text = '${req.params.text}'
    WHERE id = '${req.params.post_id}';`, 
    function(err, results, fields){
        SendData(res, err, results);
    });
    
})
app.post('/posts/addLike/:postId/:userId',(req, res) => {

    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    let ddd = year + "-" + month + "-" + date;
    // prints date & time in YYYY-MM-DD format
    console.log(ddd);

    console.log(req.params);
    console.log('adding likes on post ');
    con.query(`INSERT INTO likes_post 
    (user_id, post_id, date) VALUES ('${req.params.userId}', '${req.params.postId}', ${ddd});`, 
    function(err, results, fields){
        SendData(res, err, results);
    });
    
})
app.post('/posts/removeLike/:postId/:userId',(req, res) => {

    console.log(req.params);
    console.log('removing likes on post ');
    con.query(`DELETE FROM likes_post WHERE user_id = ${req.params.userId} AND post_id = ${req.params.postId};`, 
    function(err, results, fields){
        SendData(res, err, results);
    });
    
})
app.get('/posts/getTags/:postId',(req, res) => {

    console.log(req.params);
    console.log('getting tags on post ');
    con.query(`SELECT h.*
    FROM hashtag h
    JOIN hashtag_post pt ON h.id = pt.hash_id
    JOIN post p ON pt.post_id = p.id
    WHERE p.id = ${req.params.postId};`, 
    function(err, results, fields){
        SendData(res, err, results);
    });
    
})
app.post('/posts/addHash/:postId/:hashId',(req, res) => {

    console.log(req.params);
    console.log('removing likes on post ');
    con.query(`INSERT INTO hashtag_post (hash_id, post_id) VALUES (${req.params.hashId}, ${req.params.postId});`, 
    function(err, results, fields){
        SendData(res, err, results);
    });
    
})
app.post('/posts/removeHash/:postId/:hashId',(req, res) => {

    console.log(req.params);
    console.log('removing likes on post ');
    con.query(`DELETE FROM hashtag_post WHERE hash_id = ${req.params.hashId} AND post_id = ${req.params.postId}`, 
    function(err, results, fields){
        SendData(res, err, results);
    });
    
})
app.get('/posts/edit/grab_data/:post_id',(req, res) => {
    console.log("Grabbing post table data");
    var array= [];
	con.query(`SELECT * FROM post WHERE id = ${req.params.post_id};`, function(err, results, fields){
		array.push(results);
		con.query(`SELECT h.* FROM hashtag h JOIN hashtag_post pt ON h.id = pt.hash_id JOIN post p ON pt.post_id = p.id WHERE p.id = ${req.params.post_id};`, function(err, results, fields){
			array.push(results);
			if(err) console.log(err);
			res.send(CreateMessage('load', array));
		});
    });

})
// app.get('/posts/edit/grab_hashtags/:post_id',(req, res)=>{
//     console.log("grabbing all hashtags related to post");
	// con.query(`SELECT h.* FROM hashtag h JOIN hashtag_post pt ON h.id = pt.hash_id JOIN post p ON pt.post_id = p.id WHERE p.id = ${req.params.post_id};`, function(err, results, fields){
	// 	if(err) console.log(err);
	// 	res.send(CreateMessage('load', results));
	// });
// })
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
app.post('/hashtags/delete/:id', (req, res) => {
    console.log("deleting hastag " + req.params.id);
    con.query(`DELETE FROM hashtag WHERE id = ${req.params.id};`, function(err, results, fields){
        if(err)
            res.send(CreateMessage('error', err.sqlMessage));
        else
            res.send(CreateMessage('load', 'dwadwa'));
    });
})
app.post('/hashtags/create/:name', (req, res) => {
    console.log("creating hashtag: " + req.params.name);
    con.query(`INSERT INTO hashtag (name) VALUES ('${req.params.name}');`,
    function(err, results, fields){
        if(err) {
            console.log(err);
            res.send(CreateMessage('error', err.sqlMessage));
        }
        else 
            console.log(`Creating hashtag ${req.params.name}`);
    });
})
app.get('/hashtags/edit/:id', (req,res)=>{
    res.sendFile('edit_hashtag.html', {root: publicDir});
})
app.get('/hashtags/edit/data/:id', (req,res)=>{
    con.query(`SELECT * FROM hashtag WHERE id = ${req.params.id};`, function(err, results, fields){
        if(err) {
            console.log(err);
            res.send(CreateMessage('error', null));
        }
        else
            res.send(CreateMessage('load', results));
    });
})
app.post('/hashtags/edit/updateData/:id/:hashtagname', (req,res)=>{
    con.query(`UPDATE hashtag SET name = '${req.params.name}' WHERE id = '${req.params.id}';`, function(err, results, fields){
        if(err) {
            console.log(err);
            res.send(CreateMessage('error', null));
        }
        else
            res.send(CreateMessage('load', 'd'));
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
        SendData(res, err,results);
    });
})

app.get('/users/edit/:id', (req,res)=>{
    res.sendFile('users_edit.html', {root: publicDir});
})
app.get('/users/edit/data/:id', (req,res)=>{
    con.query(`SELECT * FROM user WHERE id = ${req.params.id};`, function(err, results, fields){
        if(err) {
            console.log(err);
            res.send(CreateMessage('error', null));
        }
        else
            res.send(CreateMessage('load', results));
    });
})
app.post('/users/edit/updateData/:id/:username/:email/:password', (req,res)=>{
    con.query(`UPDATE user SET email = '${req.params.email}', password = '${req.params.password}', display_name = '${req.params.username}' WHERE id = '${req.params.id}';`, function(err, results, fields){
        if(err) {
            console.log(err);
            res.send(CreateMessage('error', null));
        }
        else
            res.send(CreateMessage('load', 'd'));
    });
})


app.post('/users/edit/getFollowers/:id', (req,res)=>{
    console.log('getting followers');
    con.query(
    `SELECT user.*
    FROM user
    INNER JOIN relationship ON relationship.follow_id = ${req.params.id}
    WHERE user.id = relationship.user_id;`, 
    function(err, results, fields){
        SendData(res, err, results);
    });
})
app.post('/users/edit/addFollower/:id/:follower', (req,res)=>{
    console.log('add follower')
    console.log(req.params.id);
    var q = `INSERT INTO relationship (user_id, follow_id) VALUES (${req.params.follower}, ${req.params.id});`;
    con.query(
       q, 
    function(err, results, fields){
        SendData(res, err, results);
    });
})
app.post('/users/edit/removeFollower/:id/:follower', (req,res)=>{
    console.log('remove follower')
    console.log(req.params.id);
    var q = `DELETE FROM relationship WHERE user_id = ${req.params.follower} AND follow_id = ${req.params.id};`;
    con.query(
       q, 
    function(err, results, fields){
        SendData(res, err, results);
    });
})
app.post('/users/edit/removeFollowing/:id/:following', (req,res)=>{
    console.log('remove following')
    console.log(req.params.id);
    var q = `DELETE FROM relationship WHERE user_id = ${req.params.id} AND follow_id = ${req.params.following};`;
    con.query(
       q, 
    function(err, results, fields){
        SendData(res, err, results);
    });
})

app.post('/users/edit/addFollowing/:id/:following', (req,res)=>{
    console.log('add following')
    console.log(req.params.id);
    var q = `INSERT INTO relationship (user_id, follow_id) VALUES (${req.params.id}, ${req.params.following});`;
    con.query(
       q, 
    function(err, results, fields){
        SendData(res, err, results);
    });
})
app.post('/users/edit/getFollowings/:id', (req,res)=>{
    console.log('getting followings');

    con.query(
    `SELECT user.*
    FROM user
    INNER JOIN relationship ON relationship.user_id = ${req.params.id}
    WHERE user.id = relationship.follow_id;`, 
    function(err, results, fields){
        SendData(res, err, results);
    });
})
app.get('/users/edit/getPosts/:id', (req,res)=>{
    console.log('getting posts from user');
    con.query(`SELECT * FROM post WHERE user_id = ${req.params.id};`, 
    function(err, results, fields){
        SendData(res, err, results);
    });
})

app.post('/users/createUser/:username/:email/:password', (req,res)=>{
    console.log(req.params.email);
    con.query(`INSERT INTO user (email, password, display_name) VALUES ('${req.params.email}', '${req.params.password}', '${req.params.username}');
    `, function(err, results, fields){
        if(err) {
            res.send(CreateMessage('error', err.sqlMessage));
        }
        else 
            console.log(`creating a new user ('${req.params.email}', '${req.params.password}', '${req.params.username}')`);
    });
})
app.post('/users/deleteUser/:userId', (req,res)=>{
    console.log("deleting");
    con.query(`DELETE FROM likes_post WHERE user_id = ${req.params.userId};`, function(err, results, fields){
        if(err) {
            res.send(CreateMessage('error', err.sqlMessage));
            return;
        }
        else{
            con.query(`DELETE FROM relationship WHERE user_id = ${req.params.userId};`, function(err, results, fields){
                if(err) {
                    res.send(CreateMessage('error', err.sqlMessage));
                    return;
        
                }
                else{
                    con.query(`DELETE FROM relationship WHERE follow_id = ${req.params.userId};`, function(err, results, fields){
                        if(err) {
                            res.send(CreateMessage('error', err.sqlMessage));
                            return;
                
                        }
                        else{
                            con.query(`DELETE FROM post WHERE user_id = ${req.params.userId};`, function(err, results, fields){
                                if(err) {
                                    res.send(CreateMessage('error', err.sqlMessage));
                                    return;
                        
                                }
                                else{
                                    con.query(`DELETE FROM user WHERE id = ${req.params.userId};`, function(err, results, fields){
                                        if(err) {
                                            res.send(CreateMessage('error', err.sqlMessage));
                                            return;
                                
                                        }
                                        else{
                                            res.send(CreateMessage('load', 'gabagoo'));
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
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

function SendData(res, err, results){
    if(err) {
        console.log(err);
        res.send(CreateMessage('error', err.sqlMessage));
    }
    else{
        if(results != null){
            console.log(results);
            res.send(CreateMessage('load', results));
        }
        else{
            console.log("empty results");
            res.send(CreateMessage('load', ''));
        }
    }
}


app.get('*', (req,res)=>{
    res.status(404).send('ERROR 404, Page not found!');
})