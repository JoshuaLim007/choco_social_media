import * as guiMaker from "./insert_data_functions.js";

//grab all posts from server
export function GrabPosts(filterQuery, callback){
    var req = new XMLHttpRequest();

    var t = filterQuery.split('?')[1];
    if(t == undefined){
        t = '';
    }
    var url = '/posts/grabData/' + t;
    console.log(url)

    req.open('GET',url, true); // set this to POST if you would like
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

export function GrabPost(post_id, callback){
    var req = new XMLHttpRequest();

    req.open('GET','/posts/edit/grab_data/' + post_id,true); // set this to POST if you would like
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

	//grab all hashtags related to that post and
	//call the InsertPostHash(name) function
    req.send();
}
// export function GrabPostHash(post_id, callback){
//     var req = new XMLHttpRequest();

//     req.open('GET','/posts/edit/grab_hashtags/' + post_id,true); // set this to POST if you would like
//     req.addEventListener('load',()=>{
//         let response = req.responseText;
//         let parsedResponse = JSON.parse(response);
//         console.log(parsedResponse.content);
//         callback(parsedResponse.content);
//     });
//     req.addEventListener('error',()=>{
//         callback(null);
//         console.log('error receiving async AJAX call');
//     });

// 	//grab all hashtags related to that post and
// 	//call the InsertPostHash(name) function
//     req.send();
// }

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
export function CreateHashtag(name){
    var r = new XMLHttpRequest();
    r.open('POST', '/hashtags/create/' + name, true);
    r.addEventListener('load',()=>{
        let response = r.responseText;
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse);   
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
        guiMaker.InsertPost(buffer[index].id, buffer[index].user_id, buffer[index].text, buffer[index].date.split('T')[0], 0);
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


export function GetHashtagData(id, callback){
	var req = new XMLHttpRequest();

	req.open('GET','/hashtags/edit/data/' + id, true); // set this to POST if you would like
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
export function UpdateHashtagData(id, hashtagname){
    var req = new XMLHttpRequest();

    req.open('POST',`/hashtags/edit/updateData/${id}/${hashtagname}`, true); 
    req.addEventListener('load',()=>{
        let response = req.responseText;
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse.content); //outputs d which makes the name undefined
    });
    req.addEventListener('error',()=>{
        callback(null);
        console.log('error receiving async AJAX call');
    });
    req.send();
}







export function GetUserData(id, callback){
    var req = new XMLHttpRequest();

    req.open('GET','/users/edit/data/' + id, true); // set this to POST if you would like
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
export function UpdateUserData(id, username, email, password){
    var req = new XMLHttpRequest();
    req.open('POST',`/users/edit/updateData/${id}/${username}/${email}/${password}`, true); 
    req.addEventListener('load',()=>{
        let response = req.responseText;
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse.content);
    });
    req.addEventListener('error',()=>{
        callback(null);
        console.log('error receiving async AJAX call');
    });
    req.send();
}


export function GetFollowersAndFollowings(id, callback){

    var req = new XMLHttpRequest();
    var arr = {};
    req.open('POST','/users/edit/getFollowings/' + id, true);
    req.addEventListener('load',()=>{
        let response = req.responseText;
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        if(parsedResponse.type != 'error'){
            arr['followings'] = (parsedResponse.content);
        }


        req = new XMLHttpRequest();
        req.open('POST','/users/edit/getFollowers/' + id, true);
        req.addEventListener('load',()=>{
            let response = req.responseText;
            let parsedResponse = JSON.parse(response);
            if(parsedResponse.type != 'error'){
                arr['followers'] = (parsedResponse.content);
                callback(arr);
            }
        });
        req.send();


    });
    req.send();
}
const POST = 'POST';
const GET = 'GET';

export function AddFollower(account, follower, callback){
    CreateRequest(POST, '/users/edit/addFollower/' + account + '/' + follower, callback);
}
export function AddFollowing(account, following, callback){
    CreateRequest(POST, '/users/edit/addFollowing/' + account + '/' + following, callback);
}


export function CreateRequest(type, url, loadCallback, errCallback){
    console.log('req sent');

    var req = new XMLHttpRequest();
    req.open(type, url, true);
    req.addEventListener('load',()=>{
        var msg = GetJsonMessage(req);
        if(GetMessageType(msg) != 'error'){
            if(loadCallback != null)
                loadCallback(GetMessageData(msg));
        }
        else{
            if(errCallback != null)
                errCallback(null);

            console.log('error on server side');
        }
    });
    req.addEventListener('error',(e)=>{
        if(errCallback != null)
            errCallback(null);
        console.log('error receiving async AJAX call');
    });

    req.send();
}

function GetJsonMessage(req){
    let response = req.responseText;
    let parsedResponse = JSON.parse(response);
    return parsedResponse;
}
function GetMessageType(parsedResponse){
    return parsedResponse.type;
}
function GetMessageData(parsedResponse){
    return parsedResponse.content;
}