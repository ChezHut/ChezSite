const legacy = false; // legacy versions of the api are disabled
const versions = [ 1, 2, 3, 4 ];
const HTTPMessages = {
    "200": "OK",
    "201": "Created",
    "202": "Accepted",
    "204": "No Content",
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed"
}

// GET
// POST
// PUT
// DELETE
// PATCH

const response = (req, res, param1, param2, param3) => {
    let params = [param1, param2, param3];
    let error = params.filter(v => typeof v == "boolean")[0];
    let status = params.filter(v => Number.isInteger(v))[0] || 200;
    let body = params.filter(v => !(Number.isInteger(v) || typeof v == "boolean"))[0] || {};
    let response = {}

    if (error) response.error = true;
    response.status = HTTPMessages[status] ? status : 200;
    response.message = HTTPMessages[status] || HTTPMessages[200];
    response.body = body;

    return res.status(HTTPMessages[status] ? status : 200).json(response);
}

module.exports = (app, root) => {
    // register a new database
    app.all("/api", (req, res) => response(req, res, 202, { availableVersions: (legacy ? versions : [versions[0]]) }));

    app.all("/api/:version/create/:option")
    app.post("/api/:version/create/:option", (req, res) => {
        const version = req.params.version;
        if (!legacy) {
            if ((version != "v" + versions[0]) || (version != versions[0])) {
                return res.status(400).json({ error: true, status: 400, message: HTTPMessages[400], body: {} })
            }
        }
    });

    return 0;
}