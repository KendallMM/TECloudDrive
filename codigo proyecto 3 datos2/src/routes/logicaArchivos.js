const archivos = require('../models/archivos');
const   Archivo = require('../models/archivos')

class logicaArchivos{
        constructor(){

                this.subirAchivo = this.subirAchivo.bind(this);
        }

        subirAchivo(ruta,compresion,tipo_archivo,id){
                /*const archivo = Archivo.findById(id);
                archivo.ruta = 'alamacenamiento local'
                archivo.save();*/
                const {propietario} = Archivo.find({propietario:req.params.propietario});
                const ruta2 = 'almanecamineto local';
                const newArchivo = {propietario,ruta2,compresion,tipo_archivo};
                console.log('holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                console.log(id);
                console.log(compresion);
                Archivo.findByIdAndUpdate(id, newArchivo)
                if(compresion = 'huffman'){
                        console.log('ya se lo comprimi ');
                }
            
            
        }
        descargarArchivo(ruta,compresion,tipo_archivo){
                
                console.log('descomrpimir');

        }
        
}

module.exports = {logicaArchivos,};


