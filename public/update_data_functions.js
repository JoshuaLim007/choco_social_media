/*
	***how update functionality works***
	a button click will place user in a "editing" page
	that page will draw out the data of that entity
	the text inputs will have values that match the data of the entity
	changing a data would recall the insert_data functions(?)

	redirect the url send 
*/

import * as CreateFunctions from "./index.js";

CreateFunctions.GrabUsers(()=>{

});

export function SendPostData(id){
	var user_id = id;
	var text = document.getElementById("create_new_text").value;
	var date = document.getElementById("create_new_date").value;
	
	//insert function to send changes
}