const mongoose = require('mongoose');
const response = require('../libs/responseLib')
const check = require('../libs/checkLib');
const userModel = mongoose.model('User')
const taskModel = mongoose.model('Task')

let checkUser=(req,res,next)=>{
    if(check.isEmpty(req.body.userId)){
        let apiresponse = response.generate(true, 403, 'Please Enter Details to Create A new Task', null)
        res.send(apiresponse)
    }
    else{
        req.body.parents=new Array
    userModel.findOne({'userId':req.body.userId},(err,result)=>{
        if(err){
            let apiresponse = response.generate(true, 500, 'Database Error While Raising Issue', null)
            res.send(apiresponse)
        }
        else if(check.isEmpty(result)){
            let apiresponse = response.generate(true, 404, 'User Id Not Found', null)
            res.send(apiresponse)
        }
        else{
            req.body.userName=`${result.firstName} ${result.lastName}`;
            let friends=new Array;
            for(let each of result.friends){
                console.log()
                friends.push(each.userId)
            }
            friends.push(req.body.userId)
            req.body.friends=friends
            next()
            
        }
    })
    }
}

let isAuthorised=(req,res,next)=>{
    console.log(req.body)
    if(req.body.userId==null||req.body.userId==undefined){
        let apiresponse = response.generate(true, 403, 'Please Enter the user Id to check authorisation', null)
        res.send(apiresponse)
    }
    else{
        userModel.findOne({'userId':req.body.userId},(err,result)=>{
            if(err){
                let apiresponse = response.generate(true, 500, 'Database Error While Raising Issue', null)
                res.send(apiresponse)
            }
            else if(check.isEmpty(result)){
                let apiresponse = response.generate(true, 404, 'User Id Not Found', null)
                res.send(apiresponse)
            }
            else{
                req.query.userName=`${result.firstName} ${result.lastName}`
                taskModel.findOne({'taskId':req.body.taskId,'viewers':req.body.userId},(err,result1)=>{
                    if(err){
                        let apiresponse = response.generate(true, 500, 'Database Error While Raising Issue', null)
                        res.send(apiresponse)
                    }
                    else if(check.isEmpty(result1)){
                        let apiresponse = response.generate(true, 403, 'User Not Authorised to perform the action', null)
                        res.send(apiresponse)
                    }
                    else{
                        next()
                    }
                })
            }
        })
    }
}

let isUser=(req,res,next)=>{
    if(req.query.enquireId==null||req.query.enquireId==undefined){
        let apiresponse = response.generate(true, 403, 'Please Enter the user Id to check authorisation', null)
        res.send(apiresponse)
    }
    else{
        userModel.findOne({'userId':req.query.enquireId},(err,result)=>{
            if(err){
                let apiresponse = response.generate(true, 500, 'Database Error While Raising Issue', null)
                res.send(apiresponse)
            }
            else if(check.isEmpty(result)){
                let apiresponse = response.generate(true, 404, 'User Id Not Found', null)
                res.send(apiresponse)
            }
            else{
                next()
            }})}
}



module.exports={
    checkUser:checkUser,
    isAuthorised:isAuthorised,
    isUser:isUser
}