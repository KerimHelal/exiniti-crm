const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Leads = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    }
}, { collection: 'leads' });

module.exports = mongoose.model('Leads', Leads);