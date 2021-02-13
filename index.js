const constants = require("./constants.json");
const express = require("express");
const path = require("path");

const app = express();

app.use("/", "public/home");
app.use("/assets", "assets");

app.set("view engine", "ejs");
app.set("views", __dirname + "public");

app.listen(constant.port, () => {
    console.log(`Listening on port ${constant.port}`);
});