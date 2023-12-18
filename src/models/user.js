import mongoose from "./index.js";
// import  validator from "validator"




// const validateEmail = (e)=>{
//     var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

//     return emailPattern.test(e)
// }
// const validateNumber =(e)=>{
//     const phoneRegex = /^[0-9]{10}$/; 
//     return phoneRegex.test(e)
// }

//       // Access the 'password' field using 'this'
//       return e ==;
  
// }



const userSchema = new mongoose.Schema({
// firstName:{
//     type:String,
//      require:[true,"First Name is Required"],
//      trim: true
//     },

//     lastName:{
//         type:String,
//          require:[true,"Last Name is Required"],
//          trim: true
//         },
        // email: {
        //     type: String,
        //     required: [true,"Last Name is Required"],
        //     unique: true,
        //     validate(value) {
        //         if (!validator.isEmail(value)) {
        //             throw Error("not valid email")
        //         }
        //     }
        // },
        // mobile: {
        //     type: String,
        //     required: [true,"mobile number is Required"],
        //     unique: true,
        //     minlength: 10,
        //     maxlength: 10
        // },
        //  gender: {
        //     type: String,
        //     required: [true,"gender is Required"],
        // },
         password:{
            type:String,
            required:[true,"Password is required"]
        },


        resetPasswordToken: {
            type: String,
          },
          resetPasswordExpires: {
            type: Date,
          },

        status: {
            type: String,
            required:[true,"Status is Required"],
            enum: ['Active' , 'InActive'],
            default: 'Active',
           
        },
        // profile: {
        //     type: String,
        //     required: [true,"profile is Required"],
        // },
        // location: {
        //     type: String,
        //     required: [true,"location is Required"],
        // },
            // status:{
            //     type:Boolean,
            //     default:true
            // },
            role:{
                type:String,
                default:'user'
            },


            name: {
                type: String,
                required: true,
                
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            // age: {
            //     type: String,
            //     required: true,
            // },
            mobile: {
                type: Number,
                required: true,
            },
            // work: {
            //     type: String,
            //     required: true,
            //     trim: true
            // },
            add: {
                type: String,
                required: true,
            },
            desc: {
                type: String,
                required: true,
            },
        
            datecreated:Date,
            dateUpdated:Date
         

},{ 
    collection:'users',
    versionKey:false,
    timestamps:true
})
const userModel =mongoose.model('users',userSchema)
export default userModel 








