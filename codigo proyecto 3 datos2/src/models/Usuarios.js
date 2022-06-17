const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsuariosSchema = new Schema({
    Nombre:{type: String,require: true}

});

module.exports = mongoose.model('Usuario',UsuariosSchema);




