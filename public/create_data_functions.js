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

	console.log(id);
	console.log(text);
	console.log(date);
	
	CreateFunctions.CreatePost(id, text, date);
}
export function SendUserData(){
	
}
export function SendHashtagData(){

}

var btn = document.getElementById("create_post_btn");
btn.addEventListener("click", ()=>{
	SendPostData();
	location.reload();
})