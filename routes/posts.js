const express = require('express');
const router = express.Router();


const posttsController =require('../controllers/posts_controller');

router.post('/create', posttsController.create);

module.exports =router;