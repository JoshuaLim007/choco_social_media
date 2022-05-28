/*
	the following functions give data to the db and create new data based on user input
*/
import * as CreateFunctions from "./index.js";

CreateFunctions.GrabUsers(()=>{

});

export function SendPostData(){
	var name = document.getElementById("create_name").value;
	var id = document.getElementById("create_userid").value;
	var text = document.getElementById("create_text").value;
	var date = document.getElementById("create_date").value;
	var likes = document.getElementById("create_likes").value;

	//console.log(id);
	//console.log(text);
	//console.log(date);
	
	CreateFunctions.CreatePost(id, text, date);
}
export function SendUserData(){
	var name = document.getElementById("create_user_name").value;
	var email = document.getElementById("create_user_email").value;
	var password = document.getElementById("create_user_password").value;
	//CreateFunctions.CreateUser(name, email, password);
}
export function SendHashtagData(){
	var name = document.getElementById("create_hashtag_name").value;
	//hashtag_id is auto increment
	//CreateFunctions.CreateHashtag(name);
}

var btn = document.getElementById("create_btn");
btn.addEventListener("click", ()=>{
	SendPostData();
	//SendUserData();
	//SendHashtagData();
	location.reload();
})