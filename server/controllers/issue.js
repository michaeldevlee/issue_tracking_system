const Issue = require('../models/Issues');

module.exports = {
    getIssue: async (req,res) =>{
        try {
            if (req.user){
                console.log('authenticated')
                return res.send({user : req.user})
            }
            else{
                return res.send({error : 'error'})
            }
            // const issue = await Issue.find({})
            
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
                console.log(req.body.projectName)
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
            const {name, description, author, color, project} = req.body;
            const issue = await Issue.create({
                title : name, 
                description : description,
                color : color,
                project : project,
                author : author,
                reviewer : 'None',
                comments : 'None',
                status : 'Under Review',
                createdAt : Date.now(),
            })
            const data = await issue;
            res.send({issue: data})
        } catch (error) {
            res.sendStatus(404)
        }
    },
    deleteIssue: async (req,res)=>{
        try {
            const issue = await Issue.deleteOne({_id:"63112e8bd74550f7d070d932"});
            console.log(issue);
            console.log('issue deleted');
            res.send({message : 'deleted'})
        } catch (error) {
            console.log(error);
        }
    }
}