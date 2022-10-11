const express = require("express");
const router = express();
const { getAllUsers } = require('../../controllers/routerController');

router.get('/getAllUsers', getAllUsers);

module.exports = router;