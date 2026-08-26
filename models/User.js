const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    }
}, { timestamps: true }) 
// timestamps cria createdAt e updatedAt automaticamente

module.exports = mongoose.model('User', userSchema)