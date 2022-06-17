const express = require('express')
const router =express.Router();

const  Usuario = require('../models/Usuarios')


router.get('/',async (req,res) => {
    const Usuarios = await Usuario.find();
    console.log(Usuarios);
    res.json(Usuarios);
})
router.get('/:id',async(req,res) =>{
     const usuario = await Usuario.findById(req.params.id);
     res.json({usuario});
});

router.post('/',async(req,res)=> {
    const {Nombre} = req.body;
    const usuario = new Usuario({Nombre});
    await usuario.save();
    res.json({status: 'usuario guardada'});

})

router.put('/:id',async(req,res) =>{
    const {Nombre} = req.body;
    const newUsuario = {Nombre};
    await Usuario.findByIdAndUpdate(req.params.id, newUsuario)
    res.json({status: "usuario actualizado"});
})

router.delete('/:id',async(req,res) =>{
    await Usuario.findByIdAndRemove(req.params.id)
    res.json({status: "usuario borrado"});
})

module.exports = router;