/*
	***how delete functions work***
	when a delete button is clicked
	retrieve all the data associated with that entity
	and send it to the db to be deleted
	a page refresh should just remove that entity(?)
*/

export function DeletePost(name, id, text, date, likes){
	
	return {name, id, text, date, likes};
}