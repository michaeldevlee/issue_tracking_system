const express = require('express');
const router = express.Router();
const issuesController = require('../controllers/issue')
const {ensureAuth} = require('../middleware/auth')

router.post('/getIssue' ,issuesController.getIssue);
router.get('/getIssues' ,issuesController.getIssues);
router.post('/getProjects' ,issuesController.getProjects);
router.post('/createIssue', issuesController.createIssue);
router.delete('/deleteIssue', issuesController.deleteIssue);

module.exports = router;