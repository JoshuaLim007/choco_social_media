/*
	***how update functionality works***
	a button click will place user in a "editing" page
	that page will draw out the data of that entity
	the text inputs will have values that match the data of the entity
	changing a data would recall the insert_data functions(?)

	redirect the url send 
*/

function SendPostData(){
	var old_id = document.getElementById("post_id");

	app.get('/posts/grabData', (req, res) => {
		console.log("Grabbing post table");
	
		con.query("SELECT id, date, text, user_id FROM post", function(err, results, fields){
			if(err) console.log(err);
			res.send(CreateMessage('load', results));
		});
	})
}










//sends the id of the post to the server to tell that this is the current post i am editing
function SendPostID(){
	var old_id = document.getElementById("post_id");
	return old_id;
}
//fetch the data of that post from the server to fill into the text inputs
function ShowPostData(){
	//module function from server that gives me data of table
	var old_text = document.getElementById("create_new_text");
	var old_date = document.getElementById("create_new_date");
	//old_text.value = text;
	//old_date.value = date;
}
//the input values are the old values
//bruh aint this just the same shit as SendPostData()
export function UpdatePost(text, date){
	//get the values from the text input
	var id = document.getElementById("create_new_userid").value;
	var text = document.getElementById("create_new_text").value;
	var date = document.getElementById("create_new_date").value;

	//or a function that the backend has(?)
	return {input_text, input_date};
}

setTimeout(function() {
	var btn = document.getElementById("edit_post_btn");
	btn.addEventListener("click", ()=>{
		SendPostID();
	})
}, 1000);