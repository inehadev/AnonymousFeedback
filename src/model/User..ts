import mongoose , {Schema , Document} from 'mongoose';
import { Interface } from 'readline';

export interface Message extends Document {
    content :string , 
    createdAt :Date
}

const MessageSchema : Schema<Message> = new Schema({
    content : {
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        required:true,
        default :Date.now

    }
})


export interface User extends Document {
    username:string
    email:string ,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isverified:boolean,
    isAcceptingMessage:boolean,
    message :Message[]

}

const UserSchema :Schema <User> = new Schema ({
    username:{
        type:String,
        require:[true,"Username is Required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Please use a valid Email address']
        
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
    },
    verifyCode:{
        type:String,
        require:[true,"verifyCode is Required"],
    },
    verifyCodeExpiry:{
        type:Date,
        require:[true,"verifyCode is Required"],
    },
    
    isverified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true,
    }

})
