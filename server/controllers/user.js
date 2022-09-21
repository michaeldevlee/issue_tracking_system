const User = require('../models/Users');

module.exports = {
    getUser : async (req,res)=>{
        try {
            const user = await User.find({userName : req.user.userName})
            console.log(user)
            res.send({user : user})
        } catch (err) {
            console.log(err)
        }
    },
    createUser : async (req, res)=>{
        try {
            const {userName, password, email, role, projects, teams, issues, stats} = req.body;
            await User.create({
                userName : userName,
                password : password,
                email : email,
                role : 'member',
                projects : null,
                teams : null,
                issues : null,
                stats: null,
            })
            console.log(`user has been created!}`);
            res.send({message : req.body})
        } catch (err) {
            console.log(err);
        }
    },
    deleteUser :async (req, res) => {
        try {
            await User.deleteOne({name : 'Michael'})
            console.log('user has been deleted');
            res.send({message : 'user has been deleted'})
        } catch (error) {
            console.log(error)
        }
    },
    assignIssue : async (req,res)=>{
        try {
            await User.updateOne({name : 'Michael'}, {issues :'63112e8bd74550f7d070d932' })
            console.log('updated Michaels issues')
        } catch (err) {
            console.log(err)
        }
    }
}