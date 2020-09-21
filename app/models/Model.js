// importing mongoose module
const mongoose = require('mongoose')
const time=require('../libs/timeLib')
// import schema 
const Schema = mongoose.Schema;

let userSchema=new Schema(
{
    userId:{
        type:String,
        unique:true,
    },
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    code:{
      type:String
    },
    mobile:{
        type:Number,
        default:0000000000
    },
    gender:{
        type:String
    },
    joined:{
      type:Date,
      default:time.now()
    },
    country:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        default:''
    },
    friends:[],
    requests:[],
    tasks:[]
}
)

let authSchema=new Schema({
    userId: {
      type: String
    },
    authToken: {
      type: String
    },
    tokenSecret: {
      type: String
    },
    tokenGenerationTime: {
      type: Date,
      default: time.now()
    }
  })


  let taskSchema=new Schema({
    taskId:{
      type:String
    },
    title:{
      type:String
    },
    description:{
      type:String,
      default:'No description To show'
    },
    status:{
      type:String,
      default:'Open'
    },
    headTask:{
      type:String,
      default:""
    },
    parents:{
      type:Array
    },
    subTask:[],
    createdOn:{
      type:Date,
      default:time.now()
    },
    createdBy:{
      type:Object,
      required:true
    },
    lastModified:{
      type:Object,
      required:true
    },
    viewers:{
      type:Array
    }
  })


let eventSchema=new Schema({
  headTask:{
    type:String,
    required:true
  },
  eventNo:{
    type:Number,
    default:0
  },
  copy:{
    type:Array,
    default:[]
  },
  action:{
    type:String
  },
  toDelete:[]
})


mongoose.model('User', userSchema);
mongoose.model('Auth', authSchema);
mongoose.model('Task',taskSchema);
mongoose.model('Event',eventSchema)
