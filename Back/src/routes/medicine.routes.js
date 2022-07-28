'use strict'

const express = require('express');
const medicineController = require('../controllers/medicine.controller');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/pruebaMedicine', medicineController.prueba);
api.post('/addMedicine', [mdAuth.ensureAuth, mdAuth.isAdmin], medicineController.addMedicine);
api.put('/updateMedicine/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], medicineController.updateMedicine);
api.delete('/deleteMedicine/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], medicineController.deleteMedicine);

api.get('/getMedicines', medicineController.getMedicines);
api.get('/getMedicine/:id', medicineController.getMedicine);

module.exports = api;