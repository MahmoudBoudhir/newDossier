const mongoose = require("mongoose")
let User = mongoose.model("users", {
    image:{
        type:String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true

    },
    role: {
        type: String,
        default: "client"

    },
    createdAt: {
        type: Date,
        default: new Date()
    }
    

})

module.exports = User