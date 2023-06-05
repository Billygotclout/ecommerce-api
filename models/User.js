const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: [true, "Please enter first name"]
    },
    lastName:{
        type:String,
        required: [true, "Please enter last name"]
    },
    username:{
        type:String,
        required: [true, "Please enter user name"]
    },
    email:{
        type:String,
        required: [true, "Please enter valid email"],
      unique:true
    },
   password:{
        type:String,
        required: [true, "Please enter password"]
    },
})

module.exports=mongoose.model("User", UserSchema)