'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user.model');
const Medi = require('../models/medicine.model');

exports.validateData = (data) =>{
    let keys = Object.keys(data), msg = '';

    for(let key of keys){
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
        msg += `The params ${key} es obligatorio\n`
    }
    return msg.trim();
}

exports.alreadyUser = async (username)=>{
    try{
    let exist = User.findOne({username:username}).lean()
    return exist;
    }catch(err){
        return err;
    }
 }

 exports.alreadyMedicine = async (name)=>{
    try{
        let exist = Medi.findOne({name:name}).lean()
        return exist;
    }catch(err){
        return err;
    }
 }
 
 exports.encrypt = async (password) => {
     try{
         return bcrypt.hashSync(password);
     }catch(err){
         console.log(err);
         return err;
     }
 }

 exports.checkPassword = async (password, hash)=>{
    try{
        return bcrypt.compareSync(password, hash);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.checkPermission = async (userId, sub)=>{
    try{
        if(userId != sub){
            return false;
        }else{
            return true;
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.checkUpdate = async (user)=>{
    if(user.password || 
        user.role ||
       Object.entries(user).length === 0 || 
       user.role){
        return false;
    }else{
        return true;
    }
}

exports.checkUpdatePrescri = async(prescription)=>{
    if(prescription.user ||
        prescription.like ||
        Object.entries(prescription).length === 0){
        return false;
    }else{
        return true;
    }
}

exports.checkUpdateMedicine = async (medicine)=>{
    if(medicine.user ||
        Object.entries(medicine).length === 0){
        return false;
    }else{
        return true;
    }
}