'use strict'

const User = require('../models/user.model');
const Medi = require('../models/medicine.model');
const { validateData, alreadyMedicine, checkUpdateMedicine } = require('../utils/validate');

exports.prueba = async (req, res)=>{
    await res.send({message: 'Simon, si sirve'});
}

exports.addMedicine = async(req, res)=>{
    try{

        const params = req.body;
        const data = {
            user: req.user.sub,
            name: params.name,
            description: params.description,
            salesPlace: params.salesPlace,
            averagePrice: params.averagePrice
        }
        const msg = validateData(data);

        if(msg) return res.status(400).send(msg);
        const already = await alreadyMedicine(data.name);
        if(already) return res.status(400).send({message: 'Nombre de medicina ya en uso'});
        if(params.averagePrice <= 0) return res.status(400).send({message: 'El precio promedio no tiene que ser 0 o menor que 0'})

        const medi = new Medi(data);
        await medi.save();
        return res.send({message: 'Medicina guardada satisfactoriamente'});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error agregando medicina'});
    }
}

exports.updateMedicine = async(req, res)=>{
    try{

        const mediId = req.params.id;
        const params = req.body;

        const medicineExist = await Medi.findOne({_id: mediId});
        if(!medicineExist) return res.status(400).send({message: 'Medicina no encontrada'});
        /*const validateUpdate = await checkUpdateMedicine(params);
        if(validateUpdate === false) return res.status(400).send({message: 'No se pueden actualizar esa informacion o params invalidos'});*/
        let alreadyName = await alreadyMedicine(params.name);
        if(alreadyName && medicineExist.name != params.name) return res.status(400).send({message: 'Nombre de medicina ya en uso, utilice otro'});
        if(params.averagePrice <= 0) return res.status(400).send({message: 'El precio promedio no tiene que ser 0 o menor que 0'})
        const mediUpdate = await Medi.findOneAndUpdate({_id: mediId}, params, {new: true});
        if(mediUpdate) return res.send({message: 'Medicina actualizada', mediUpdate});
        return res.status(400).send({message: 'Medicina no actualizada'});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error actualizando medicina'});
    }
}

exports.deleteMedicine = async(req, res)=>{
    try{

        const mediId = req.params.id;
        const mediDeleted = await Medi.findOneAndDelete({_id: mediId});
        if(mediDeleted) return res.send({message: 'Medicina eliminada', mediDeleted});
        return res.status(400).send({message: 'Medicina no encontrada o ya eliminada'});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error eliminando medicina'});
    }
}

exports.getMedicines = async(req, res)=>{
    try{

        const medicines = await Medi.find().lean();
        if(medicines.length == 0){
            res.status(400).send({message: 'Medicinas no encontradas'});
        }else{
            return res.send({medicines});
        }

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error trayendo las medicinas'});
    }
}

exports.getMedicine = async(req, res)=>{
    try{

        const mediId = req.params.id;
        const mediExist = await Medi.findOne({_id: mediId});
        return res.send({message: 'Medicina: ', mediExist});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error obteniendo medicina'})
    }
}