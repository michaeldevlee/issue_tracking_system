const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');

router.get('/getUser', usersController.getUser);
router.post('/createUser', usersController.createUser);
router.put('/assignIssue', usersController.assignIssue);
router.delete('/deleteUser', usersController.deleteUser);

module.exports = router;