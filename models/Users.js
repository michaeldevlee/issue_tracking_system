const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    role:{
        type: String,
    },
    projects:{
        type: String,
    },
    teams:{
        type: String,
    },
    issues:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Issues'
    },
    stats:{
        type: String,
    },

})





module.exports = mongoose.model('User', UserSchema);