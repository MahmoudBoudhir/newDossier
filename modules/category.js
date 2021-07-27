const mongoose = require("mongoose")

let Category = mongoose.model("categories", {

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    createdAt: {
        type: Date,
        default: new Date()
    }

})


module.exports = Category