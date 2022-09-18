const Issues = require('../models/Issues');
const Users = require('../models/Users');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    getProjects: async (req, res) =>{
        try {
            if (req.user){
                const user = await Users.find(
                    {author : req.user.userName},
                )
                console.log(user)
                return res.send({user : user})
            }
            else{
                return res.send({error : 'error'})
            }

        } catch (error) {
            console.log('failed')
            console.log(error)
        }
    },
    createProject: async (req, res) =>{
        try {
            if (req.user){
                const {name, description, author, color, projectName} = req.body;

                //create issue
                const issue = await Issues.create({
                    title : name, 
                    description : description,
                    color : color,
                    projectName : projectName,
                    author : author,
                    reviewer : 'None',
                    comments : 'None',
                    status : 'Created',
                    createdAt : Date.now(),
                })

                // create new project and assign object id 
                const project = await Users.findOneAndUpdate(
                    {userName : author},
                    {
                        projects :                     
                        {
                            projectName : projectName,
                            author : author,
                            issues : [issue],
                        }
                    },

                )

                console.log('new project')
                return res.send({user : project})
            }
            else{
                return res.send({error : 'error'})
            }

        } catch (error) {
            console.log('failed')
            console.log(error)
        }
    },
}