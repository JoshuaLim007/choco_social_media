/*
	***how update functionality works***
	a button click will place user in a "editing" page
	that page will draw out the data of that entity
	the text inputs will have values that match the data of the entity
	changing a data would recall the insert_data functions(?)
*/

//get the values of the post and shove the into the text inputs
function InputOldDataPost(text, date){
	var old_text = document.getElementById("create_new_text");
	var old_date = document.getElementById("create_new_date");
	old_text.value = text;
	old_date.value = date;
}
//the input values are the old values
export function UpdatePost(text, date){
	//get the values from the text input
	var input_text = document.getElementById("create_new_text").value;
	var input_date = document.getElementById("create_new_date").value;

	//or a function that the backend has(?)
	return {input_text, input_date};
}

var btn = document.getElementById("edit_post_btn");
btn.addEventListener("click", ()=>{
	console.log("test");
	//location.reload();
})