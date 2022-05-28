/*
	***how update functionality works***
	a button click will place user in a "editing" page
	that page will draw out the data of that entity
	the text inputs will have values that match the data of the entity
	changing a data would recall the insert_data functions(?)
*/

//get the values of the post and shove the into the text inputs
export function InputOldDataPost(id, name, text, date, likes){
	var old_id = document.getElementById("create_new_name");
	var old_name = document.getElementById("create_new_userid");
	var old_text = document.getElementById("create_new_text");
	var old_date = document.getElementById("create_new_date");
	var old_likes = document.getElementById("create_new_likes");
	old_id.value = id;
	old_name.value = name;
	old_text.value = text;
	old_date.value = date;
	old_likes.value = likes;
}
//the input values are the old values
export function UpdatePost(id, name, text, date, likes){
	//get the values from the text input
	var input_id = document.getElementById("create_new_name").value;
	var input_name = document.getElementById("create_new_userid").value;
	var input_text = document.getElementById("create_new_text").value;
	var input_date = document.getElementById("create_new_date").value;
	var input_likes = document.getElementById("create_new_likes").value;

	return {input_id, input_name, input_text, input_date, input_likes};
}

var btn = document.getElementById("edit_post_btn");
btn.addEventListener("click", ()=>{
	console.log("test");
	//location.reload();
})