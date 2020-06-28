const express = require('express');

//Router function which helps in routing the user to specific page according to URL.
const router = express.Router();

console.log('Main Index router loaded');

//Importing function from controller class
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);

//Routing users related pages
router.use('/users', require('./users'));







//Exporting router.
module.exports = router;