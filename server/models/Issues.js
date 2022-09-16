const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    title:{
        type: String, 
    },
    description:{
        type: String,
    },
    projectName:{
        type:String,
    },
    color:{
        type: String,
    },
    author:{
        type: String,
    },
    reviewer:{
        type: String,
    },
    status:{
        type: String,
    },
    createdAt:{
        type: Date,
    },

})

module.exports = mongoose.model('Issue', IssueSchema);