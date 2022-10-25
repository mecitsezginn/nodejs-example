var crypto = require("crypto");

exports.rfid_encrypter = (plainText) => {
    const key = new Buffer("&F)J@NcRfUjXn2r5") ;
    const cipher = crypto.createCipheriv("aes-128-ecb", key, null);
    return cipher.update(plainText), cipher.final('hex');
}
