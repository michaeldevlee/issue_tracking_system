const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    reviewer:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        required: true,
    },

})

module.exports = mongoose.model('Issue', IssueSchema);