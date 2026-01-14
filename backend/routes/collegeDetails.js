const express = require('express');
const { getCollegeById } = require('../controllers/collegeDetails');

const router = express.Router();

router.get('/:id', getCollegeById);

module.exports = router;
