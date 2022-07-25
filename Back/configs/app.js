'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('../src/routes/user.routes');
const presRoutes = require('../src/routes/prescriptions.routes');
const medicineRoutes = require('../src/routes/medicine.routes');

const app = express(); //instancia

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/user', userRoutes);
app.use('/prescription', presRoutes);
app.use('/medicine', medicineRoutes);

module.exports = app;