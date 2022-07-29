'use strict'

const Pres = require('../models/prescriptions.model');
const { validateData, alreadyUser, checkUpdatePrescri, checkPermission } = require('../utils/validate');
const User = require('../models/user.model');
const Already = require('../models/already.model');

exports.prueba = async (req, res)=>{
    await res.send({message: 'Simon, si sirve'});
}

exports.addPrescription = async(req, res)=>{
    try{

        const params = req.body;
        const data = {
            user: req.user.sub,
            name: params.name,
            description: params.description,
            ingredients: params.ingredients,
            preparation: params.preparation,
            like: 0
        }
        const msg = validateData(data);

        if(msg) return res.status(400).send(msg);

        const pres = new Pres(data);
        await pres.save();
        return res.send({message: 'Receta creada satisfactoriamente'});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error agregando recetas caseras'});
    }
}

exports.addLike = async(req, res)=>{
    try{

        const presId = req.params.id;
        const userLog = req.user.sub;
        console.log(userLog);
        const presExist = await Pres.findOne({_id: presId})
        if(!presExist) return res.status(400).send({message: 'Error dando like'});
        const alreadyLike = await Already.findOne({user: userLog, prescription: presId});
        if(!alreadyLike) {
            const data = {
                user: userLog,
                prescription: presId
            }

            const alreLike = new Already(data);
            await alreLike.save();

            const suma = {
                like: presExist.like + 1
            }
            const presUpdated = await Pres.findOneAndUpdate({_id: presId}, suma, {new: true});
            if(!presUpdated) return res.status(400).send({message: 'Error dando like'});
            return res.send({message: 'Like completado'});
        }
        if(alreadyLike) return res.status(400).send({message: 'Este usuario ya realizo like a esta receta'})

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error agregando like'});
    }
}

exports.getPrescriptions = async(req, res)=>{
    try{

        const getPres = await Pres.find()
        .sort({like: -1})
        .lean()
        return res.send({getPres});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error obteniendo recetas caseras'})
    }
}

exports.getPrescription = async(req, res)=>{
    try{

        const presId = req.params.id;
        const presExist = await Pres.findOne({_id: presId});
        return res.send({message: 'Receta casera: ', presExist})

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error obteniendo receta'});
    }
}

exports.getPrescriptionsByUser = async(req, res)=>{
    try{

        const userLog = req.user.sub;
        const prescriptions = await Pres.find({user: userLog})
        return res.send({message: 'Tus recetas son: ', prescriptions});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error obteniendo recetas caseras'})
    }
}


exports.updatePrescriptions = async(req, res)=>{
    try{

        const prescriId = req.params.id;
        const userLog = req.user.sub;
        const params = req.body;

        const checkUpdate = await checkUpdatePrescri(params);
        if(checkUpdate === true) return res.status(400).send({message: 'No han sido enviado los params para actualizar o no se pueden actualizar'});
        const presExist = await Pres.findOne({_id: prescriId});
        if(!presExist) return res.status(400).send({message: 'Receta no encontrada'});
        const permission = await checkPermission(presExist.user, userLog);
        if(permission === false) return res.status(401).send({message: 'No tienes permiso para actualizar esta receta'});
        const presUpdated = await Pres.findOneAndUpdate({_id: prescriId}, params, {new: true})
        .lean();
        if(!presUpdated) return res.status(400).send({message: 'Problemas actualizando la receta'});
        return res.send({message: 'Receta actualizada', presUpdated});
        
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error actualizando recetas'})
    } 
}

exports.deletePrescriptions = async(req, res)=>{
    try{

        const prescriId = req.params.id;
        const userLog = req.user.sub;

        const presExist = await Pres.findOne({_id: prescriId});
        if(!presExist) return res.status(400).send({message: 'receta casera no encontrada'});
        const permission = await checkPermission(presExist.user, userLog);
        if(permission === false) return res.status(401).send({message: 'No tienes permiso para eliminar esta receta'})
        const prescriDeleted = await Pres.findOneAndDelete({_id: prescriId})
        .lean();
        if(!prescriDeleted) return res.status(400).send({message: 'Receta casera no encontrada o ya eliminada'});
        return res.send({message: 'Receta eliminada'});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error eliminando receta'});
    }
}

exports.updatePrescriptionsByAdmin = async(req, res)=>{
    try{

        const prescriId = req.params.id;
        const params = req.body;

        const checkUpdate = await checkUpdatePrescri(params);
        if(checkUpdate === false) return res.status(400).send({message: 'No han sido enviado los params para actualizar o no se pueden actualizaro hasn sido enviado los params para actualizar o no se pueden actualizar'});
        const presExist = await Pres.findOne({_id: prescriId});
        if(!presExist) return res.status(400).send({message: 'Receta no encontrada'});
        const presUpdated = await Pres.findOneAndUpdate({_id: prescriId}, params, {new: true})
        .lean();
        if(!presUpdated) return res.status(400).send({message: 'Problemas actualizando la receta'});
        return res.send({message: 'Receta actualizada', presUpdated});
        
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error actualizando recetas'})
    } 
}

exports.deletePrescriptionsByAdmin = async(req, res)=>{
    try{

        const prescriId = req.params.id;

        const presExist = await Pres.findOne({_id: prescriId});
        if(!presExist) return res.status(400).send({message: 'receta casera no encontrada'});
        const prescriDeleted = await Pres.findOneAndDelete({_id: prescriId})
        .lean();
        if(!prescriDeleted) return res.status(400).send({message: 'Receta casera no encontrada o ya eliminada'});
        return res.send({message: 'Receta eliminada'});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error eliminando receta'});
    }
}