const express = require("express");
const router = express.Router();
const { getAulas, getAulaById, AddAula, UpdateAula, DeleteAula } = require('../controllers/classroomContoller.js');

router.get('/', getAulas);
router.get('/:id', getAulaById);
router.post('/', AddAula);
router.put('/:id', UpdateAula);
router.delete('/:id', DeleteAula)


module.exports = router;