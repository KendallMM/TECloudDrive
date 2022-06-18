const archivos = require('../models/archivos');


class logicaArchivos{
        constructor(){

                this.subirAchivo = this.subirAchivo.bind(this);
        }

        subirAchivo(ruta,compresion,tipo_archivo){
                
                if(compresion == 'huffman'){
                        console.log('ya se lo comprimi ');
                }
            
            
        }
        descargarArchivo(ruta,compresion,tipo_archivo){
                
                console.log('descomrpimir');

        }
        
}

module.exports = {logicaArchivos,};


