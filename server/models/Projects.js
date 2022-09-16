const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title:{
        type: String, 
    },
    description:{
        type: String,
    },
    issues:{
        type:Array,
    },
    createdAt:{
        type: Date,
    },

})

module.exports = mongoose.model('Project', ProjectSchema);