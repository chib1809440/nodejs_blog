const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.get("/tin-tuc", (req, res) => {
	res.send("Trang tin tức");
});
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
