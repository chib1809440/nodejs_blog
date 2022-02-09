const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

//Http logger
app.use(morgan("combined"));

//template engine
app.engine(
	"hbs",
	engine({
		extname: ".hbs",
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/resource/views/"));

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/news", (req, res) => {
	res.render("news");
});

app.listen(port, () => {
	console.log(`\r\nExample app listening at http://localhost:${port}`);
});
