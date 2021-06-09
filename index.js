/*
 * ChezCoderTK is under the MIT license.
 */

const path = require("path");
require("./routes/routeManager.js");
require("fs").readdir(".", (n, dirContents) => dirContents.forEach(filename => (filename.endsWith(".js") && filename != path.basename(__filename)) ? require("./" + filename) : ""));
console.log("[Finish] All files required within " + path.basename(__filename));