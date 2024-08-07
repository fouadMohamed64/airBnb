const express = require('express');
const { login} = require('../controllers/user');

let router = express.Router();

router.post('/login', login)


export default router;
