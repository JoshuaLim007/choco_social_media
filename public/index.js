import * as guiMaker from "./insert_data_functions.js";

//grab all posts from server
export function GrabPosts(callback){
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

export function GrabHashtags(callback){
    var req = new XMLHttpRequest();

    req.open('GET','/hashtags/grabData',true); // set this to POST if you would like
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
export function DeleteHashtags(id, domElement){
    var r = new XMLHttpRequest();
    r.open('POST', '/hashtags/delete/' + id, true);
    r.addEventListener('load',()=>{
        let response = r.responseText;
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        
        if(parsedResponse.type != 'error')
            domElement.remove();
    
    });
    r.send();
}

//userId = uint
//text = string
//date = yyyy-dd-mm
export function CreatePost(userId, text, date){
    var r = new XMLHttpRequest();
    r.open('POST', '/posts/createPost/' + userId +'/' + text + '/' + date, true); // set this to POST if you would like
    r.addEventListener('load',()=>{
        console.log(r.responseText);
    });
    r.send();
}

//grab all users from server
export function GrabUsers(callback){
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
export function CreateUser(Username, email, password){
    var r = new XMLHttpRequest();
    r.open('POST', '/users/createUser/' + Username +'/' + email + '/' + password, true); // set this to POST if you would like
    r.addEventListener('load',()=>{
        console.log(r.responseText);
    });
    r.send();
}

export function GrabUserFromId(id, callback){
    var r = new XMLHttpRequest();
    r.open('GET', '/users/grabUserName/' + id, true); // set this to POST if you would like
    r.addEventListener('load',()=>{
        let response = r.responseText;
        let parsedResponse = JSON.parse(response);
        if(parsedResponse.type != 'error'){
            console.log(parsedResponse.content);
            callback(parsedResponse.content);
        }
    });
    r.send();
}

export function recursive_async_postDOMcreation(buffer, index, maxLength){

    if(index >= maxLength){
        return;
    }

    GrabUserFromId(buffer[index].user_id, (username) => {
        guiMaker.InsertPost(buffer[index].id, username[0].display_name, buffer[index].text, buffer[index].date.split('T')[0], 0);
        recursive_async_postDOMcreation(buffer, index + 1, maxLength);
    });

}

export function DeletePost(id, domElement){
    var r = new XMLHttpRequest();
    r.open('POST', '/posts/deletePost/' + id, true);
    r.addEventListener('load',()=>{
        let response = r.responseText;
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        
        if(parsedResponse.type != 'error')
            domElement.remove();
    
    });
    r.send();
}

export function DeleteUser(id, domElement){
    console.log("deleting");
    let r = new XMLHttpRequest();
    r.open('POST', '/users/deleteUser/' + id, true);
    r.addEventListener('load',()=>{
        let response = r.responseText;
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        
        if(parsedResponse.type != 'error')
            domElement.remove();
    
    });
    r.send();
}