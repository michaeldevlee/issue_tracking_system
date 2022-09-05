const Issue = require('../models/Issues');

module.exports = {
    getIssue: async (req,res) =>{
        try {
            console.log(req.body)
            const issue = await Issue.find({})
            res.send({message : issue})
        } catch (error) {
            console.log('failed')
            console.log(error)
        }
    },
    createIssue: async (req,res)=>{
        try {
            const issue = await Issue.create({
                title : 'New Issue', 
                description : 'wow what an issue',
                author : 'Michael Lee',
                reviewer : 'None',
                status : 'Created',
                createdAt : Date.now(),
            })
            console.log(issue)
        } catch (error) {
            console.log(error);
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