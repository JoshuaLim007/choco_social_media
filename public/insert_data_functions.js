import * as main from "./index.js";

/*
	Following are insert functions. they should just create tables or rows of data
	make post neater
*/

export function InsertPost(id, name, text, date, likes){
	//bc some pages expect the content_section div to exist since the index.js is calling this function on every page (since the index.js file is called on every page)
	//probably have to do a conditional for all the other functions(?)

	var content_section = document.getElementById("content_div");
	if (content_section === null){
		console.log("content_section does not exist");
	}
	else{
		//var content_section = document.createElement("div");
		var post_div = document.createElement("div");
		var table = document.createElement("table");
		var div = document.createElement("div");
		var edit_btn = document.createElement("a");
		var delete_btn = document.createElement("button");

		delete_btn.addEventListener('click', function(){
			main.DeletePost(id, post_div);
		});

		var tr_1 = document.createElement("tr");
		var tr_2 = document.createElement("tr");
		//var th_name = document.createElement("th");
		//var th_name_link = document.createAttribute("a");
		var th_id = document.createElement("th");
		var th_text = document.createElement("th");
		var th_date = document.createElement("th");
		var td_id = document.createElement("td");
		var td_text = document.createElement("td");
		var td_date = document.createElement("td");
		//var td_likes = document.createElement("td");
		//var td_likes_link = document.createElement("a");

		//content_section.setAttribute("class", "content");
		td_id.setAttribute("id", "post_id");
		td_text.setAttribute("id", "post_text");
		td_date.setAttribute("id", "post_date");
		post_div.setAttribute("id", "post");
		post_div.setAttribute("class", "post");
		edit_btn.setAttribute("class","change_post_btn");
		delete_btn.setAttribute("class","change_post_btn");
		edit_btn.setAttribute("id", "edit_post_btn");
		delete_btn.setAttribute("id", "delete_post_btn");
		//th_name_link.setAttribute("class", "");
		//td_likes_link.setAttribute("class", "post_td_likes_link");

		
		edit_btn.href="/posts/edit/" + id;
		//th_name_link.href="/"; //insert followers page
		//td_likes_link.href = "/";//insert likes page

		edit_btn.textContent=("edit post");
		delete_btn.textContent=("delete post");
		//th_name.textContent = (name);
		th_id.textContent = ("Post ID");
		th_text.textContent = ("Text");
		th_date.textContent = ("Date");
		td_id.textContent = (id);
		td_text.textContent = (text);
		td_date.textContent  =(date);
		//td_likes_link.textContent  =(likes);
		//td_likes.textContent = ("# of likes: ");

		//cant have a link in the header of table attributes
		//th_name.appendChild(th_name_link);
		//td_likes.appendChild(td_likes_link);
		//tr_1.appendChild(th_name);
		tr_1.appendChild(th_id);
		tr_1.appendChild(th_text);
		tr_1.appendChild(th_date);
		tr_2.appendChild(td_id);
		tr_2.appendChild(td_text);
		tr_2.appendChild(td_date);
		//tr_2.appendChild(td_likes);
		table.appendChild(tr_1);
		table.appendChild(tr_2);
		post_div.appendChild(table);
		div.appendChild(delete_btn);
		div.appendChild(edit_btn);
		post_div.appendChild(div);
		content_section.appendChild(post_div);

		//var body =document.getElementById("post_body");
		//body.appendChild(content_section);
	}
}

export function InsertHashtag(id, name){
	const table = document.getElementById("hashtag_table");
	const tr = document.createElement("tr");
	
	var td_name = document.createElement("td");
	var td_id = document.createElement("td");
	var td_edit = document.createElement("td");
	var td_del = document.createElement("td");
	var edit = document.createElement("a");
	var btn = document.createElement("button");
	
	td_id.setAttribute("id", "hashtag_id");

	td_name.textContent = (name);
	td_id.textContent = (id);
	edit.textContent=("edit");
	btn.textContent=("delete");

	td_edit.appendChild(edit);
	td_del.appendChild(btn);
	tr.appendChild(td_name);
	tr.appendChild(td_id);
	tr.appendChild(td_edit);
	tr.appendChild(td_del);
	table.appendChild(tr);
}
export function InsertPostHash(name){
	var table = document.getElementById("post_hash_table");
	var tr = document.createElement("tr");

	var td_name = document.createElement("td");
	td_name.textContent = (name);

	tr.appendChild(td_name);
	table.appendChild(tr);
}

export function InsertUser(id, name, email, password){
	const table = document.getElementById("accounts_table");
	const tr = document.createElement("tr");

	var td_id = document.createElement("td");
	var td_name = document.createElement("td");
	var td_email = document.createElement("td");
	var td_password = document.createElement("td");
	var td_edit = document.createElement("td");
	var td_del = document.createElement("td");
	var edit = document.createElement("a");
	var btn = document.createElement("button");

	td_id.setAttribute("id", "user_id");

	td_id.textContent = (id);
	td_name.textContent = (name);
	td_email.textContent = (email);
	td_password.textContent = (password);
	edit.textContent=("edit");
	btn.textContent=("delete");

	btn.addEventListener('click', function(){
		main.DeleteUser(id, tr);
	});

	td_edit.appendChild(edit);
	td_del.appendChild(btn);
	tr.appendChild(td_id);
	tr.appendChild(td_name);
	tr.appendChild(td_email);
	tr.appendChild(td_password);
	tr.appendChild(td_edit);
	tr.appendChild(td_del);
	table.appendChild(tr);
}