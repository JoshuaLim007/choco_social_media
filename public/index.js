
//grab all posts from server
function GrabPosts(callback){
    var req = new XMLHttpRequest();

    req.open('GET','/posts/grabData',true); // set this to POST if you would like
    req.addEventListener('load',()=>{
        let response = req.responseText;
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse.content);
        callback(parsedResponse.content);
    });
    req.addEventListener('error',()=>{
        callback(null);
        console.log('error receiving async AJAX call');
    });
    req.send();
}

//userId = uint
//text = string
//date = yyyy-dd-mm
function CreatePost(userId, text, date){
    var r = new XMLHttpRequest();
    r.open('POST', '/posts/createPost/' + userId +'/' + text + '/' + date, true); // set this to POST if you would like
    r.addEventListener('load',()=>{
        console.log(r.responseText);
    });
    r.send();
}

//grab all users from server
function GrabUsers(callback){
    var req = new XMLHttpRequest();

    req.open('GET','/users/grabData',true); // set this to POST if you would like
    req.addEventListener('load',()=>{
        let response = req.responseText;
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse.content);
        callback(parsedResponse.content);
    });
    req.addEventListener('error',()=>{
        callback(null);
        console.log('error receiving async AJAX call');
    });
    req.send();
}

//
function CreateUser(Username, email, password){
    var r = new XMLHttpRequest();
    r.open('POST', '/users/createUser/' + Username +'/' + email + '/' + password, true); // set this to POST if you would like
    r.addEventListener('load',()=>{
        console.log(r.responseText);
    });
    r.send();
}

