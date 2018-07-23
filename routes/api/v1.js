const express = require('express');
const router = express.Router();


router.get('/', function(req, res){
    res.json({"message" : "Hello"})
});

module.exports = router;