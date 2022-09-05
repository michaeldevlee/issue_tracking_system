const User = require('../models/Users');
const Issue = require('../models/Issues');

module.exports = {
    getUser : async (req,res)=>{
        try {
            const user = await User.find()
            console.log(user)
            res.send({user : 'confirmed'})
        } catch (err) {
            console.log(err)
        }
    },
    createUser : async (req, res)=>{
        try {
            await User.create({name : 'Michael'})
            console.log(`user has been created!}`);
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