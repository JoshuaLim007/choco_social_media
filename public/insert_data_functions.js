/*
	Following are insert functions. they should just create tables or rows of data
*/

function InsertPost(id, name, text, date, likes){
	var content_section = document.getElementsByClassName("content");
	var post_div = document.createElement("div");
	post_div.setAttribute("id", "post");
	post_div.setAttribute("class", "post");
	var table = document.createElement("table");

	var tr_1 = document.createElement("tr");
	var tr_2 = document.createElement("tr");
	var th_name = document.createElement("th");
	var th_id = document.createElement("th");
	var td_text = document.createElement("td");
	var td_date = document.createElement("td");
	var td_likes = document.createElement("td");
	
	th_name.document.createTextNode(name);
	th_id.document.createTextNode(id);
	td_text.document.createTextNode(text);
	td_date.document.createTextNode(date);
	td_likes.document.createTextNode(likes);

	tr_1.appendChild(th_name);
	tr_1.appendChild(th_id);
	tr_2.appendChild(td_text);
	tr_2.appendChild(td_date);
	tr_2.appendChild(td_likes);
	table.appendChild(tr_1);
	table.appendChild(tr_2);
	post_div.appendChild(table);
	content_section.appendChild(post_div);
}

function InsertUser(id, name, email, password){
	const table = document.getElementById("accounts_table");
	const tr = document.createElement("tr");

	var td_id = document.createElement("td");
	var td_name = document.createElement("td");
	var td_email = document.createElement("td");
	var td_password = document.createElement("td");

	td_id.createTextNode(id);
	td_name.createTextNode(name);
	td_email.createTextNode(email);
	td_password.createTextNode(password);

	tr.appendChild(td_id);
	tr.appendChild(td_name);
	tr.appendChild(td_email);
	tr.appendChild(td_password);
	table.appendChild(tr);
}

function InsertHashtag(id, name){
	const table = document.getElementById("hashtag_table");
	const tr = document.createElement("tr");
	
	var td_name = document.createElement("td");
	var td_id = document.createElement("td");
	
	td_name.createTextNode(name);
	td_id.createTextNode(id);

	tr.appendChild(td_name);
	tr.appendChild(td_id);
	table.appendChild(tr);
}