const path = require("path");
const rootPath = path.normalize(path.join(__dirname, "/../"))

module.exports = {
    development: {
        rootPath,
        port: process.env.PORT || 5000,
        dbPath: 'mongodb://localhost:27017/Gadget-Store-server-db'
    },
    production: {}
};