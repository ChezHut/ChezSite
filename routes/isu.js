const cors = require("cors");
const fs = require("fs");

var spamchecks = {}
var messageDelay = 1000 * 3;

module.exports = (app, root) => {
    app.post("/isu_livechat/:username/:message", cors(), (req, res, err) => {
        if (!spamchecks[req.params.username]) spamchecks[req.params.username] = { lastMessage: 0 }
        if ((spamchecks[req.params.username].lastMessage + messageDelay) >= Date.now()) {
            let delay = ((spamchecks[req.params.username].lastMessage + messageDelay) - Date.now()) / 1000;
            delay = Math.floor(delay * 100) / 100;
            res.status(403);
            return res.send({ "error": true, "message": `Please wait ${delay} seconds before sending your next message!` })
        }

        spamchecks[req.params.username].lastMessage = Date.now();

        let livechat = JSON.parse(fs.readFileSync("database/isu/livechat.json"));
        livechat.push({
            "username": req.params.username,
            "content": req.params.message,
            "timestamp": Date.now()
        });
        fs.writeFileSync("database/isu/livechat.json", JSON.stringify(livechat));
        res.sendFile(root + "/database/isu/livechat.json");
    });

    app.get("/isu_livechat", cors(), (req, res, err) => {
        res.sendFile(root + "/database/isu/livechat.json");
    });

    function auth(req, res, next) {
        if (req.headers.authorization == "Bearer " + process.env.AUTHORIZATION) return true;
        return res.status(403).json({ status: "403", message: "You do not have access to this resource!" });
    }

    return 0;
}