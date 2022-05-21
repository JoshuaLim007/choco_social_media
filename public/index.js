var req = new XMLHttpRequest();

req.open('GET','/posts/grabData',true); // set this to POST if you would like
req.addEventListener('load',()=>{
    let response = req.responseText;
    let parsedResponse = JSON.parse(response);  //list of posts
    console.log(parsedResponse);
});
req.addEventListener('error',()=>{
    console.log('error receiving async AJAX call');
});
req.send();

CreatePost(0, "test sample", "2222-22-2");

//date = yyyy-dd-mm
function CreatePost(userId, text, date){
    var r = new XMLHttpRequest();
    r.open('POST', '/posts/createPost/' + userId +'/' + text + '/' + date, true); // set this to POST if you would like
    r.send();

}