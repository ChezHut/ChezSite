const express = require("express");
const bp = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const cipher = require("../cipher.js");
const CHARS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

module.exports = (app, root) => {
    /* debug */
    // const tbase64 = string => (new Buffer.from(string).toString("base64"));
    // const fbase64 = string => (new Buffer.from(string, "base64").toString());

    const tbase64 = string => string;
    const fbase64 = string => string;

    app.set("views", path.join(root, "/public"));
    app.set("view engine", "ejs");

    app.use("/", express.static("public/chezcodertk/home"));
    app.use("/home", express.static("public/chezcodertk/home"));
    app.use("/projects", express.static("public/chezcodertk/projects"));
    app.use("/about", express.static("public/chezcodertk/about"));
    app.use("/login", express.static("public/chezcodertk/login"));
    app.use("/signup", express.static("public/chezcodertk/signup"));
    app.use("/uptime", express.static("public/chezcodertk/uptime"));
    app.use("/lib", express.static("assets/libs"));

    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));

    app.get("/templates/:fileName/:fileType", (req, res, err) => {
        const fileName = req.params.fileName.toLowerCase();
        const fileType = req.params.fileType.toLowerCase();

        res.sendFile(path.join(root, `/public/chezcodertk/templates/${fileName}.${fileType}`));
    });

    app.get("/assets/:fileName", (req, res, err) => {
        res.status(200);
        res.sendFile(path.join(root, "/assets/" + req.params.fileName));
    });

    app.post("/accounts", (req, res, err) => {
        let accounts = JSON.parse(fbase64(fs.readFileSync("../database/chezcodertk/accounts.txt", "utf8")));
        let sessions = JSON.parse(fbase64(fs.readFileSync("../database/chezcodertk/sessionIDs.txt", "utf8")));

        if (!req.body.action) {
            res.status(400);
            return res.send({ "status": 400, "success": false, "error": "Please provide an account action, { \"action\": \"[signup/login]\" }" });
        }

        if (req.body.action == "signup") {
            if (!req.body.username || !req.body.password) {
                res.status(400);
                return res.send({ "status": 400, "success": false, "error": "Please provide account information, { \"username\": \"username\", \"password\": \"password\" }" });
            }
            let accountExists = false;
            Object.keys(accounts).forEach(id => {
                if (accounts[id].username == req.body.username) {
                    accountExists = true;
                    return;
                }
            });
            
            if (accountExists) {
                res.status(401);
                return res.send({ "status": 401, "success": false, "error": "Account already exists." });
            }

            let id = "";

            do {
                for (let i = 0;i < 20;i++) {
                    id += CHARS[Math.floor(Math.random() * CHARS.length)];
                }
            } while (accounts[id]);

            let password = cipher.sha256(req.body.password);
            accounts[id] = { "username": req.body.username, "password": password, "metadata": { "accountCreation": Date.now() } }

            let sid = "";

            do {
                for (let i = 0;i < 20;i++) {
                    if (Math.round(Math.random()) === 0)
                        sid += CHARS[Math.floor(Math.random() * CHARS.length)];
                    else
                        sid += CHARS[Math.floor(Math.random() * CHARS.length)].toUpperCase();
                }
                sid += ".";
                for (let i = 0;i < 20;i++) {
                    if (Math.round(Math.random()) === 0)
                        sid += CHARS[Math.floor(Math.random() * CHARS.length)];
                    else
                        sid += CHARS[Math.floor(Math.random() * CHARS.length)].toUpperCase();
                }
            } while (sessions[sid]);


            sessions[sid] = { "id": id, "sessionStart": Date.now() }

            fs.writeFileSync("database/sessionIDs.txt", tbase64(JSON.stringify(sessions, null, 4)));
            fs.writeFileSync("database/accounts.txt", tbase64(JSON.stringify(accounts, null, 4)));
            
            res.send({ "status": 200, "success": true, "username": req.body.username, "sid": sid, "id": id }).status(200);
        }
    });


    app.get("/tos", (req, res, err) => {
        res.sendFile(path.join(root, "/public/chezcodertk/policies/tos.html"));
    });

    app.get("/privacy", (req, res, err) => {
        res.sendFile(path.join(root, "/public/chezcodertk/policies/privacypolicy.html"));
    });

    return 0;
}