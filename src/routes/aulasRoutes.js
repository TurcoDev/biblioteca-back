const express = require("express");
const router = express.Router();
const { getAulas, getAulaById } = require('../controllers/classroomContoller.js');


router.get('/', getAulas);

router.get('/:id', getAulaById);


module.exports = router;