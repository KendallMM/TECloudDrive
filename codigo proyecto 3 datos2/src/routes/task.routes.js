const express = require('express')
const router =express.Router();
const {logicaArchivos} = require( './logicaArchivos');
const  Usuario = require('../models/Usuarios')
const   Archivo = require('../models/archivos')
const guardado = 'alamcenamieno local';


router.get('/',async (req,res) => {
    const Archivos = await Archivo.find();
    console.log(Archivos);
    res.json(Archivos);
})
router.get('/:id',async(req,res) =>{
    
     const archivo = await Archivo.findById(req.params.id);
     const {propietario,ruta,compresion,tipo_archivo,etiqueta,guardado} = archivo;
     const logica = new logicaArchivos();
     logica.descargarArchivo(ruta,compresion,tipo_archivo,etiqueta);
     
     res.json({archivo});
});

router.get('/busqueda/:propietario',async(req,res) =>{
    const archivo = await Archivo.find({propietario:req.params.propietario});
    console.log(archivo);
    res.json({archivo});
});

router.get('/busqueda/:propietario/:etiqueta',async(req,res) =>{
    const archivo = await Archivo.find({propietario:req.params.propietario,etiqueta:req.params.etiqueta});
    console.log(archivo);
    res.json({archivo});
});

router.post('/',async(req,res)=> {
    const {propietario,ruta,compresion,tipo_archivo,etiqueta} = req.body;
    const logica = new logicaArchivos();
    
    const archivo = new Archivo({propietario,ruta,compresion,tipo_archivo,etiqueta,guardado});
    
    await archivo.save();
    logica.subirAchivo(ruta,compresion,tipo_archivo,etiqueta);
    res.json({status: 'usuario guardada'});

})

router.put('/:id',async(req,res) =>{
    const {propietario,ruta,compresion,tipo_archivo} = req.body;
    const newArchivo = {propietario,ruta,compresion,tipo_archivo,guardado};
    await Archivo.findByIdAndUpdate(req.params.id, newArchivo)
    res.json({status: "usuario actualizado"});
})
router.put('/editaretiqueta/:id',async(req,res) =>{
    const archivo = await Archivo.findById(req.params.id);
    const {propietario,ruta,compresion,tipo_archivo,guardado} = archivo;
    const {etiqueta} = req.body;
    const newArchivo = {propietario,ruta,compresion,tipo_archivo,etiqueta,guardado};
    await Archivo.findByIdAndUpdate(req.params.id, newArchivo)
    res.json({status: "usuario actualizado"});
})

router.delete('/:id',async(req,res) =>{
    await Archivo.findByIdAndRemove(req.params.id)
    res.json({status: "usuario borrado"});
})



module.exports = router;