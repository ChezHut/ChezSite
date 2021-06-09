const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const root = "/home/runner/ChezCoderTK";

require("fs").readdir("./routes", (n, dirContents) => {
    dirContents.forEach(filename => (filename.endsWith(".js") && filename != path.basename(__filename)) ? console.log("[Finish] Loaded " + filename, "\t", require("./" + filename)(app, root)) : "")
    app.get('*', (req, res, err) => res.status(404).sendFile(path.join(root, "/public/chezcodertk/404/index.html")));
});


app.listen(process.env["PORT"], () => console.log("[Finish] Listening to port 3000 from " + path.basename(__filename)));