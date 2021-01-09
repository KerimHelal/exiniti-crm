const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    role: {
        type: String
    }
}, { collection: 'users' });

module.exports = mongoose.model('Users', Users);