const express = require('express');
const router = express.Router();
const issuesController = require('../controllers/issue')
const {ensureAuth} = require('../middleware/auth')

router.get('/getIssue' ,issuesController.getIssue);
router.post('/createIssue', issuesController.createIssue);
router.delete('/deleteIssue', issuesController.deleteIssue);

module.exports = router;