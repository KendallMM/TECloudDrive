const mongoose = require('mongoose');
const {Schema} = mongoose;

const ArchivosSchema = new Schema({
    propietario: { type: String, required: true },
    ruta: { type: String, required: true },
    compresion: { type: String, required: true },
    tipo_archivo: { type: String, required: true },
    guardado: { type: String},
    etiqueta: { type: String},

});

module.exports = mongoose.model('Archivo',ArchivosSchema);