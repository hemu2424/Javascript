import {Schema ,model,Document} from "mongoose"

export interface IStudent extends Document{
    firstName:string;
    lastName:string;
    email:string;
    phone:number;
    age:number;
    course:string;
}

const studentschema = new Schema<IStudent>(
    {
        firstName:{
            type:String,
            required:[true,"first name is required"],
            trim: true,
        },
        lastName:{
            type:String,
            required:[true,"last name is required"],
            trim: true,
        },
        email:{
            type:String,
            required:[true,"email is required"],
            trim: true,
            lowercase:true

        },
        phone:{
            type:Number,
            required:[true,"Number is required"],
            trim: true,
        },
        age:{
            type:Number,
            required:[true,"age is required"],
            trim: true
        },
        course:{
            type:String,
            required:[true,"course is required"],
            trim:true
        }

    },
    {timestamps:true}
)

const Student = model<IStudent>("Student",studentschema);
export default Student