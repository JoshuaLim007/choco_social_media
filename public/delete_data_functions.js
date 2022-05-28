/*
	***how delete functions work***
	when a delete button is clicked
	retrieve all the data associated with that entity
	and send it to the db to be deleted
	a page refresh should just remove that entity(?)
*/

export function DeletePost(){
	var post_id = document.getElementById("post_id").value;
	return post_id;
}

export function DeleteHashtag(){
	var hash_id = document.getElementById("hashtag_id").value;
	return hash_id;
}

export function DeleteUser(){
	var user_id = document.getElementById("user_id").value;
	return user_id;
}