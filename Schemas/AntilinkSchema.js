
const mg = require('mongoose');

const AntilinkSchema = new mg.Schema({
    _id: { type: String, require: true },
    logs: { type: Boolean, default: false } 
})

module.exports = mg.model('Antilink', AntilinkSchema)