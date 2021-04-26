// Copyright (c) 2020 ChezCoder
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const express = require("express");
const bp = require("body-parser");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const app = express();
const CHARS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const sha256 = crypto.createHash("sha256");

app.set("views", path.join(__dirname, "/public"));
app.set("view engine", "ejs");

app.use("/", express.static("public/home"));
app.use("/home", express.static("public/home"));
app.use("/login", express.static("public/login"));
app.use("/signup", express.static("public/signup"));
app.use("/uptime", express.static("public/uptime"));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/templates/:fileName/:fileType", (req, res, err) => {
    const fileName = req.params.fileName.toLowerCase();
    const fileType = req.params.fileType.toLowerCase();

    res.sendFile(path.join(__dirname, `/public/templates/${fileName}.${fileType}`));
});

app.get("/assets/:fileName", (req, res, err) => {
    res.status(200);
    res.sendFile(path.join(__dirname, "/assets/" + req.params.fileName));
});

app.post("/accounts", (req, res, err) => {
    let accounts = fs.readFileSync("./database/accounts.json");
    let sessions = fs.readFileSync("./database/sessionIDs.json");

    console.log(req.body)
    res.status(200);

    if (req.body.action == "signup") {
        if (!req.body.username) return res.send({ "status": 400, "success": false });
        if (!req.body.password) return res.send({ "status": 400, "success": false });
        let id = "";

        do {
            for (let i = 0;i < 20;i++) {
                id += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
        } while (!accounts[id]);
        crypto
        accounts[id]

        res.send({ "status": 200, "success": true });
    }

});

app.get('*', function(req, res){
    res.status(404);
    res.sendFile(path.join(__dirname, "/public/404/index.html"));
});

app.listen(process.env["PORT"], () => {
    console.log("Up");
});

const _0x2cb2=['364658lIpECR','1204068LVSazO','shift','writeFileSync','1143UJetax','1538MTZQJn','651646ifPdVA','binary','823VMnEed','push','315189eulEBS','670591fWsQff','328177MuGBEC','1239619BUMvYP','477410CIhpRs','base64','toString','from','1502684KmRvwP','1108192rtBQnZ','678599MRZdTP','4LcLkOh','readFileSync','utf8','1leujCI','1693ALwhWZ','311VjbkiU'];function _0x1d76(_0x17817f,_0x2b33cb){_0x17817f=_0x17817f-0x8d;let _0x2cb22f=_0x2cb2[_0x17817f];return _0x2cb22f;}const _0x318b80=_0x1d76;(function(_0x2e45f4,_0x15da80){const _0x2b6576=_0x1d76;while(!![]){try{const _0x12b808=parseInt(_0x2b6576(0x9b))+-parseInt(_0x2b6576(0x96))+parseInt(_0x2b6576(0x95))*-parseInt(_0x2b6576(0x8f))+-parseInt(_0x2b6576(0xa2))*-parseInt(_0x2b6576(0x92))+parseInt(_0x2b6576(0x93))*parseInt(_0x2b6576(0x9d))+-parseInt(_0x2b6576(0xa7))+parseInt(_0x2b6576(0x9a))*parseInt(_0x2b6576(0x99));if(_0x12b808===_0x15da80)break;else _0x2e45f4['push'](_0x2e45f4['shift']());}catch(_0x1a61d0){_0x2e45f4['push'](_0x2e45f4['shift']());}}}(_0x2cb2,0xd6262));const _0x3619=['binary',_0x318b80(0x91),_0x318b80(0x98),_0x318b80(0x8d),_0x318b80(0x90),_0x318b80(0xa5),'86WFcLyl',_0x318b80(0xa1),_0x318b80(0x94),_0x318b80(0xa6),_0x318b80(0xa0),'1GfGqdk',_0x318b80(0xa3),_0x318b80(0x9f),'_/home.404.html',_0x318b80(0xa4),_0x318b80(0x8e)],_0x163cb0=_0x4f40;function _0x4f40(_0x55ec1a,_0x5b4b52){_0x55ec1a=_0x55ec1a-0x197;let _0x5a89f3=_0x3619[_0x55ec1a];return _0x5a89f3;}(function(_0x10b6dd,_0x20cfab){const _0x5d1592=_0x318b80,_0x59bb12=_0x4f40;while(!![]){try{const _0x30f781=parseInt(_0x59bb12(0x1a1))+-parseInt(_0x59bb12(0x1a4))+parseInt(_0x59bb12(0x19e))+-parseInt(_0x59bb12(0x1a0))+parseInt(_0x59bb12(0x19b))*-parseInt(_0x59bb12(0x19f))+parseInt(_0x59bb12(0x197))+parseInt(_0x59bb12(0x19a))*-parseInt(_0x59bb12(0x19c));if(_0x30f781===_0x20cfab)break;else _0x10b6dd[_0x5d1592(0x9e)](_0x10b6dd['shift']());}catch(_0x1356f0){_0x10b6dd[_0x5d1592(0x9e)](_0x10b6dd[_0x5d1592(0x97)]());}}}(_0x3619,0x8e580));const ttb=_0x568148=>fs[_0x163cb0(0x1a7)](_0x163cb0(0x1a2),new Buffer[(_0x163cb0(0x19d))](fs[_0x163cb0(0x198)](_0x568148,_0x318b80(0x91)),_0x318b80(0x9c))[_0x163cb0(0x199)]('base64')),btt=_0x284b90=>fs[_0x163cb0(0x1a7)](_0x163cb0(0x1a2),new Buffer[(_0x318b80(0xa6))](fs[_0x163cb0(0x198)](_0x284b90,_0x163cb0(0x1a6)),_0x163cb0(0x1a3))[_0x163cb0(0x199)](_0x163cb0(0x1a5)));