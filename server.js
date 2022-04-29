var path = require('path');
var express = require('express');
var expresshbs = require('express-handlebars')
var fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', expresshbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('*', function (req, res) {
  	//res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
	res.status(404);
	res.render('404');
});

app.listen(port, function () {
  	console.log("== Server is listening on port", port);
});