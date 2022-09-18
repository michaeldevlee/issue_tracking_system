const Issue = require('../models/Issues');
const Users = require('../models/Users');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    getIssue: async (req,res) =>{
        try {
            if (req.user){
                const issue = await Issue.find({_id:req.body._id});
                console.log(issue);
                return res.send({issue : issue})
            }
            else{
                return res.send({error : 'error'})
            }
            
            
        } catch (error) {
            console.log('failed')
            console.log(error)
        }
    },
    getIssues: async (req,res) =>{
        try {
            if (req.user){
                const issues = await Issue.find({author:req.user.userName})
                console.log('authenticated')
                return res.send({user : issues})
            }
            else{
                return res.send({error : 'error'})
            }
            
            
        } catch (error) {
            console.log('failed')
            console.log(error)
        }
    },
    createIssue: async (req,res)=>{
        try {
            const {name, description, author, color, projectName} = req.body;

            // create the issue
            const issue = await Issue.create({
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

            //assign to user in projects array
            const user = await Users.find(
                {projects:{$elemMatch :{projectName : projectName}}}
                    )

            res.send({issue: user})
        } catch (error) {
            res.sendStatus(404)
        }
    },
    updateIssue: async (req,res)=>{
        try {
            const issue = await Issue.updateOne({_id:req.body._id});
            const data = await issue.json();
            console.log(data);
            console.log('issue updated');
            res.send({message : 'updated'})
        } catch (error) {
            console.log(error);
        }
    },
    deleteIssue: async (req,res)=>{
        try {
            const issue = await Issue.deleteOne({_id:req.body._id});
            console.log(issue);
            console.log('issue deleted');
            res.send({message : 'deleted'})
        } catch (error) {
            console.log(error);
        }
    }
}