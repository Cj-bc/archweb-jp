var express = require("express");
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();
var fs = require('fs');
var db = new sqlite3.Database("views/news/index.sqlite3");

/* GET home page. */
router.get("/", function(req, res, next) {
	db.serialize(function() {
		db.all("SELECT * FROM news", function(err, rows){
			if (!err) {
				var article = new Array();
				rows.forEach(function(news){
					article.push(fs.readFileSync("views/news/" + news.url + ".html", "utf-8"));
				});
				res.render("index", {
					title: "Arch Linux JP Project",
					news: rows,
					body: article,
					selected: "anb-home"
				});
			}
		});
	});
});

module.exports = router;
