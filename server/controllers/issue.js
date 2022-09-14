const Issue = require('../models/Issues');
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
    getProjects: async (req, res) =>{
        try {
            if (req.user){
                const projects = await Issue.find({projectName:req.body.projectName})
                console.log('authenticated')
                return res.send({user : projects})
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
            const data = await issue;
            res.send({issue: data})
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