'use strict'

const express = require('express');
const prescriController = require('../controllers/prescriptions.controller');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/pruebaPrescri', prescriController.prueba);
api.post('/addPrescription', mdAuth.ensureAuth,prescriController.addPrescription);
api.delete('/addLike/:id', mdAuth.ensureAuth,prescriController.addLike);
api.get('/getAllPrescriptions', mdAuth.ensureAuth, prescriController.getPrescriptions);
api.get('/getPrescription/:id', mdAuth.ensureAuth, prescriController.getPrescription);
api.get('/getPrescriptionsByUser', mdAuth.ensureAuth, prescriController.getPrescriptionsByUser);

api.put('/updatePrescriptions/:id', mdAuth.ensureAuth, prescriController.updatePrescriptions);
api.delete('/deletePrescription/:id', mdAuth.ensureAuth, prescriController.deletePrescriptions);

api.put('/updatePrescriptionByAdmin/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], prescriController.updatePrescriptionsByAdmin);
api.delete('/deletePrescriptionByAdmin/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], prescriController.deletePrescriptionsByAdmin);

module.exports = api;