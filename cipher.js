const crypto = require("crypto");

const algorithm = process.env.CIPHER_ALGORITHM;
const secret = process.env.CIPHER_KEY;
const iv = crypto.randomBytes(16);

class Hash {
    constructor(content, iv) {
        this.content = content;
        this.iv = iv;
    }
}

const encrypt = text => {
    const cipher = crypto.createCipheriv(algorithm, secret, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return new Hash(encrypted.toString("hex"), iv.toString("hex"));
}

const decrypt = hash => {
    const decipher = crypto.createDecipheriv(algorithm, secret, Buffer.from(hash.iv, "hex"));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, "hex")), decipher.final()]);
    return decrypted.toString();
}

const sha256 = text => {
    return new Buffer.from(crypto.createHmac("sha256", req.body.password).digest()).toString("base64");
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    sha256: sha256
}