const Projects = require('../models/Projects');
const Users = require('../models/Users');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    getProjects: async (req, res) =>{
        try {
            if (req.user){
                const projects = await Projects.find(
                    {collaborators : req.user.userName},
                )
                console.log(req.user.userName)
                console.log(projects)
                return res.send({projects : projects})
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
                const {description, author, color, projectName} = req.body;
                const issue_id = new ObjectId();

                // create new project and assign issue
                const project = await Projects.create({
                    projectName : projectName,
                    author : author,
                    collaborators : [author],
                    description : description,
                    issues : [{
                        id : issue_id.toString(),
                        projectName : projectName,
                        description : description,
                        color : color,
                        author : author,
                        reviewer : 'None',
                        comments : 'None',
                        status : 'Created',
                        createdAt : Date.now(),
                    }],
                })

                console.log('new project')
                return res.send({project : project})
            }
            else{
                return res.send({error : 'error'})
            }

        } catch (error) {
            console.log('failed')
            console.log(error)
        }
    },
    updateProject: async (req, res) =>{
        try {
            if (req.user){
                const {author, name, description, color, projectName, new_issue, new_collaborator, action, issue_identifier} = req.body;

                if (new_issue){
                    if(action == "ADD"){
                            // add new issue
                        const issue_id = new ObjectId();
                        const issue_update = await Projects.updateOne(
                        {projectName : projectName,},
                        {$push:{issues : {
                            id : issue_id,
                            title: name,
                            projectName : projectName,
                            description : description,
                            color : color,
                            author : author,
                            reviewer : 'None',
                            comments : 'None',
                            status : 'Created',
                            createdAt : Date.now(),
                        }}}
                        )
                        console.log(issue_update);
                    }
                    else if (issue_identifier){
                        // delete issue
                        const issue_update = await Projects.updateOne(
                            {projectName : projectName,},
                            {$pull:{issues : {id : issue_identifier}}}
                            )
                            console.log(issue_update);
                    }
                    
                }
                else if (new_collaborator){
                    if(action == "ADD"){
                        // add new collaborator
                        const collaborator_update = await Projects.updateOne(
                            {projectName : projectName,},
                            {$push:{collaborators : new_collaborator}}
                            )
                            console.log(collaborator_update);
                    }
                    else{
                        // remove collaborator
                        const collaborator_remove = await Projects.updateOne(
                            {projectName : projectName,},
                            {$pull:{collaborators : new_collaborator}}
                            )
                            console.log(collaborator_remove);
                    }

                }


                console.log('new project')
                return res.send({user : "updated"})
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