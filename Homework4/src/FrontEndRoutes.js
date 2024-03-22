const express = require('express');
const frontendRouter = require('express').Router();

const path = require('path');
// Designate the static folder as serving static resources
frontendRouter.use(express.static('static'));
frontendRouter.use(express.urlencoded({extended: true}));
const html_dir = path.join(__dirname, '../templates/');

frontendRouter.get('/', (req, res) => {
    res.sendFile(`${html_dir}feed.html`);
});

frontendRouter.get('/feed', (req, res) => {
res.sendFile(`${html_dir}feed.html`);
});

frontendRouter.get('/profile', (req, res) => {
res.sendFile(`${html_dir}profile.html`);
});

frontendRouter.get('/login', (req,  res) => {
res.sendFile(`${html_dir}login.html`);
});

const APIRouter = require('./routes');
frontendRouter.use('/api', APIRouter);

  
module.exports = frontendRouter;
