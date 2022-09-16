const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project')

router.get('/getProjects', projectController.getProjects)
router.post('/createProject', projectController.createProject)

module.exports = router