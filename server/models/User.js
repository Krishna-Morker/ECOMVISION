import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            min:2,
            max:100
        },
        email:{
            type:String,
            required:true,
            max:50,
            unique:true
        },
        password:{
            type:String,
            default: "$2b$10$M62ybY2nJLxqQM0noVK49O9/eJm/8xIdE5o3pxGHGT1niVsmhj8ay",
            min:5,
        },
        tokens:[{
            token:{ 
                type:String
            }
        
        }],
        city:String,
        state:String,
        country:String,
        occupation:String,
        phoneNumber:String,
        transactions:Array,
        role:{
            type:String,
            enum:["user","admin","superadmin"],
            default:"admin",
        },
    },
    {timestamps:true}
)
UserSchema.methods.generateAuthToken= async function(){
    try {
        const toke= jwt.sign({email:this.email},process.env.Secret_Key);
        this.tokens=this.tokens.concat({token:toke});
        await this.save();
        console.log(this.tokens,"I am in usermodel");
        return toke;
    } catch (error) {
        res.send("the error part"+error);

    }
}
const User = mongoose.model("User",UserSchema);
export default User; 