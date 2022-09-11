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
    createIssue: async (req,res)=>{
        try {
            const {name, description, color} = req.body;
            const issue = await Issue.create({
                title : name, 
                description : description,
                color : color,
                author : 'Michael Lee',
                reviewer : 'None',
                status : 'Created',
                createdAt : Date.now(),
            })
            const data = await issue;
            res.send({issue: data})
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