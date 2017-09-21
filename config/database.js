const crypto = require('crypto').randomBytes(256).toString('hex');
// Cryptographic functionality

// Exporting db config
module.exports = {
    uri: 'mongodb://localhost:27017/mean2',
    secret: crypto,
    db: 'mean2'
}