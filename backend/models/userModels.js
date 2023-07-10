import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
});

userSchema.methods.matchPassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword, this.password);
}

const User = mongoose.model('User',userSchema)
export default User