const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib')
const check = require('../libs/checkLib');
const passcheck = require('../libs/generatePasswordLib')
const token = require('../libs/tokenLib');

const userModel = mongoose.model('User')
const authModel = mongoose.model('Auth')
const taskModel = mongoose.model('Task')

/*----------------------------------------------------------------------------------------------------------------------------------------*/
//Logging in a registered User
let login = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                userModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        let apiResponse = response.generate(true, 500, 'Failed To Find User Details', null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                         let apiResponse = response.generate(true, 404, 'No User Details Found', null)
                        reject(apiResponse)
                    } else {
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, 400, '"email" parameter is missing', null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {

        return new Promise((resolve, reject) => {
            passcheck.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    let apiResponse = response.generate(true, 500, 'Login Failed', null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    let apiResponse = response.generate(true, 400, 'Wrong Password.Login Failed', null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 500, 'Failed To Generate Token', null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            authModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 500, 'Failed To Generate Token', null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new authModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            let apiResponse = response.generate(true, 500, 'Failed To Generate Token', null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            let apiResponse = response.generate(true, 500, 'Failed To Generate Token', null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 200, 'Login Successful', resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.status(err.status)
            res.send(err)
        })
}




//Registering a new user
let signup = (req, res) => {
    userModel.findOne({ 'email': req.body.email }, (err, result) => {
        if (err) {
            let apiresponse = response.generate(true, 500, 'Error While Signing Up', err)
            res.send(apiresponse)
        }
        else if (!check.isEmpty(result)) {
            let apiresponse = response.generate(true, 404, 'User Already Exists', req.body.email)
            res.send(apiresponse)
        }
        else {
            let id = shortid.generate()
            let user = new userModel({
                userId: id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                code:req.body.code,
                mobile:req.body.mobile,
                email: req.body.email,
                gender:req.body.gender,
                country:req.body.country,
                password: passcheck.hashpassword(req.body.password),
            })
            user.save((err, result1) => {
                if (err) {
                    let apiresponse = response.generate(true, 500, 'Error While Signing Up', err)
                    res.send(apiresponse)
                }
                else {
                    
                    delete result1.password
                     let apiresponse = response.generate(false, 200, 'User Registered Successfully', result1)
                    res.send(apiresponse)
                        }
                    })
                    
                }

            })
        }
    
let getUserDetails=(req,res)=>{
    if(req.params.userId==null || req.params.userId==undefined){
        let apiresponse = response.generate(true, 403, 'UserId Not Entered', null)
        res.send(apiresponse)
    }
    else{
        userModel.findOne({'userId':req.params.userId},{password:0,_id:0,_v:0},(err,result)=>{
            if(err){
                let apiresponse = response.generate(true, 500, 'Error While Fetching Info', null)
                res.send(apiresponse)
            }
            else if(check.isEmpty(result)){
                let apiresponse = response.generate(true, 404, 'User not Found for userId', req.params.userId)
                res.send(apiresponse)
            }
            else{
                let apiresponse = response.generate(false, 200, 'UserDetails',result)
                res.send(apiresponse)
            }
        })
    }
}

let logout = (req, res) => {
    authModel.findOneAndRemove({ userId: req.params.userId }, (err, result) => {
        if (err) {
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, 500, `error occurred: ${err.message}`, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 404, 'Already Logged Out or Invalid UserId', result)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 200, 'Logged Out Successfully', null)
            res.send(apiResponse)
        }
    })
}

/*----------------------------------------------------------------------------------------------------------------------------------------*/
//Checking for Social user's Email
let getUserByEmail=(req,res)=>{
    if (req.params.email == undefined || req.params.email == null) {
        let apiresponse = response.generate(false, 200, 'Email Not passed', null)
        res.send(apiresponse)
    }
    else {
        userModel.findOne({'email': req.params.email },(err, result) => {
            if (err) {
                let apiresponse = response.generate(true, 500, 'Error while fetching user', err)
                res.send(apiresponse)
            }
            else if(check.isEmpty(result)) {
                let apiresponse = response.generate(true, 404,"User Not exist", null)
                res.send(apiresponse)
            }
            else{
                let apiresponse=response.generate(false,200,"User Found",result)
                res.send(apiresponse)
            }
        })
    }
}

let getAllUsers=(req,res)=>{
    userModel.find({},{'_id':0,'password':0,'_v':0},(err,result)=>{
        if(err){
        let apiresponse = response.generate(true, 500, 'Database Error While fetching the Users', null)
        res.send(apiresponse)
        }
        else{
            if(result.length<(req.query.limit*req.query.page)){
                let apiresponse = response.generate(true,403, 'The records you are asking is out of bound. Please Send appropriate value',`Total Length is ${result.length}`)
                res.send(apiresponse)
            }
            else{
                start=(req.query.page-1)*req.query.limit
                if(req.query.limit==0){ end=result.length }
                else{ end=start+req.query.limit }
                result=result.slice(start,end) 
                let apiresponse = response.generate(false,200, 'All User in database', result)
                res.send(apiresponse) 
            }
            
        }
    })
}


let resetPassword=(req,res)=>{
    if(req.body=={}){
        let apiresponse = response.generate(false, 200, 'Value Not Passed', null)
        res.send(apiresponse)
    }
    else{
        userModel.findOne({'email':req.body.email},(err,result)=>{
            if(err){
                let apiresponse = response.generate(true,500, 'Database Error While Changing Password', null)
                res.send(apiresponse)
                }
            else if(check.isEmpty(result)){
                let apiresponse = response.generate(true,404, 'No user with this email', null)
                res.send(apiresponse)
            }
            else{
                passcheck.comparePassword(req.body.oldPassword,result.password, (error, isMatch) => {
                    if(error){
                        let apiresponse = response.generate(true,500, 'Error While verifying password', error)
                        res.send(apiresponse)
                    }
                    else if(isMatch){
                        userModel.findOneAndUpdate({'email':req.body.email},{$set:{'password':passcheck.hashpassword(req.body.newPassword)}},(err,succ)=>{
                            if(err){
                                let apiresponse = response.generate(true,500, 'Database Error While Changing Password', null)
                                res.send(apiresponse)
                            }
                            else{
                                let apiresponse = response.generate(false,200, 'Password Changed Successfully', null)
                                res.send(apiresponse)
                            }
                        })
                    }
                    else{
                        let apiresponse = response.generate(false,403, 'Old Password Does not Match', null)
                        res.send(apiresponse)
                    }
                })
            }
        })
    }
}


let sendRequest=(req,res)=>{
    console.log(req.body)
    if(req.body.sender==undefined||req.body.receiver==undefined){
        let apiresponse = response.generate(false,403, 'Please Pass the required parameters', null)
        res.send(apiresponse)
    }
    else{
        userModel.find({'userId':req.body.sender,'requests.userId':req.body.receiver},(err,result)=>{
            if(err){
                let apiresponse = response.generate(true,500, 'Database Error While sending friend request', null)
                res.send(apiresponse)
            }
            else if(check.isEmpty(result)){
                let val={
                    userId:req.body.sender,
                    userName:req.body.senderName
                }
                userModel.findOneAndUpdate({'userId':req.body.receiver},{$push:{'requests':val}},(err,result)=>{
                    if(err){
                        let apiresponse = response.generate(true,500, 'Database Error While sending friend request', null)
                        res.send(apiresponse)
                    }
                    else if(check.isEmpty(result)){
                        let apiresponse = response.generate(true,404, 'Sender user Id not found', null)
                        res.send(apiresponse)
                    }
                    else{
                        let apiresponse = response.generate(true,200, 'Friend Request Send Sucessfully', null)
                        res.send(apiresponse)
                    }
                })
            }
            else{
                let apiresponse = response.generate(true,403, 'You have a pending request from the receiver. Please accept that.', null)
                res.send(apiresponse)
            }
        })
        
    }
}


let removeRequest=(req,res)=>{
    if(req.body.sender==undefined||req.body.receiver==undefined){
        let apiresponse = response.generate(false,403, 'Please Pass the required parameters', null)
        res.send(apiresponse)
    }
    else{

        userModel.findOneAndUpdate({'userId':req.body.receiver},{$pull:{'requests':{'userId':req.body.sender}}},(err,result)=>{
            if(err){
                let apiresponse = response.generate(true,500, 'Database Error While sending friend request', null)
                res.send(apiresponse)
            }
            else if(check.isEmpty(result)){
                let apiresponse = response.generate(true,404, 'Sender user Id not found', null)
                res.send(apiresponse)
            }
            else{
                let apiresponse = response.generate(true,200, 'Friend Request removed Send Sucessfully', null)
                res.send(apiresponse)
            }
        })
    }

}

let getMySendRequests=(req,res)=>{
    if(req.params.userId==null||req.params.userId==undefined){
        let apiresponse = response.generate(false,403, 'Please Pass the required parameters', null)
        res.send(apiresponse)
    }
    else{
        userModel.find({'requests.userId':req.params.userId},{'password':0,'_id':0},(err,result)=>{
            if(err){
                let apiresponse = response.generate(true,500, 'Database Error While getting send friend request', null)
                res.send(apiresponse)
            }
            else{
                let apiresponse = response.generate(false,200, 'Send Request details', result)
                res.send(apiresponse)
            }
        })
    }
}

let acceptRequest=(req,res)=>{
    if(req.body.sender==null||req.body.receiver==null||req.body.senderName==null||req.body.receiverName==null){
        let apiresponse = response.generate(false,403, 'Please Pass the required parameters', null)
        res.send(apiresponse)
    }
    else{
        userModel.find({'userId':{$in:[req.body.sender,req.body.receiver]}},(err,success)=>{
            if(err){
                let apiresponse = response.generate(true,500, 'Database Error While accepting friend request', null)
                res.send(apiresponse)
            }
            else if(success.length<2){
                let apiresponse = response.generate(true,404, 'Sender Id or Receiver Id not found', null)
                res.send(apiresponse)
            }
            else{
                let data={
                    userId:req.body.sender,
                    userName:req.body.senderName
                }
                userModel.findOneAndUpdate({'userId':req.body.receiver},{$push:{'friends':data},$pull:{'requests':{'userId':req.body.sender}}},(err,result1)=>{
                   if(err){
                       let apiresponse = response.generate(true,500, 'Database Error While accepting friend request', null)
                       res.send(apiresponse)
                       }
                   else{
                       data1={
                           userId:req.body.receiver,
                           userName:req.body.receiverName
                       }
                       userModel.findOneAndUpdate({'userId':req.body.sender},{$push:{'friends':data1}},(err,result2)=>{
                           if(err){
                               let apiresponse = response.generate(true,500, 'Database Error While accepting friend request', null)
                               res.send(apiresponse)
                               }
                           else{
                               taskModel.updateMany({'taskId':{$in:result2.tasks}},{$push:{'viewers':req.body.receiver}},(err,succ)=>{
                                   if(err){
                                       let apiresponse = response.generate(true,500, 'Database Error While accepting friend request', null)
                                       res.send(apiresponse)
                                       }
                                   else{
                                       taskModel.updateMany({'taskId':{$in:result1.tasks}},{$push:{'viewers':req.body.sender}},(err,succ)=>{
                                           if(err){
                                               let apiresponse = response.generate(true,500, 'Database Error While accepting friend request', null)
                                               res.send(apiresponse)
                                               }
                                           else{
                                               let apiresponse = response.generate(false,200, 'Request Accepted', null)
                                               res.send(apiresponse)
                                           }
                                       })
                                   }
                               })
                           }})
                   }})
            }
        })
    }
}


let unfriend=(req,res)=>{
    if(req.body=={}){
        let apiresponse = response.generate(false,403, 'Please Pass the required parameters', null)
        res.send(apiresponse)
    }
    else{
        userModel.find({'userId':{$in:[req.body.sender,req.body.receiver]}},(err,success)=>{
            if(err){
                let apiresponse = response.generate(true,500, 'Database Error While accepting friend request', null)
                res.send(apiresponse)
            }
            else if(success.length<2){
                let apiresponse = response.generate(true,404, 'Please check User Ids.', null)
                res.send(apiresponse)
            }
            else{
                userModel.findOneAndUpdate({'userId':req.body.receiver},{$pull:{'friends':{'userId':req.body.sender}}},(err,result1)=>{
                   if(err){
                       let apiresponse = response.generate(true,500, 'Database Error While removing from friends', null)
                       res.send(apiresponse)
                       }
                   else{
                       userModel.findOneAndUpdate({'userId':req.body.sender},{$pull:{'friends':{'userId':req.body.receiver}}},(err,result2)=>{
                           if(err){
                               let apiresponse = response.generate(true,500, 'Database Error While accepting friend request', null)
                               res.send(apiresponse)
                               }
                           else{
                               taskModel.updateMany({'taskId':{$in:result2.tasks}},{$pull:{'viewers':req.body.receiver}},(err,succ)=>{
                                   if(err){
                                       let apiresponse = response.generate(true,500, 'Database Error While accepting friend request', null)
                                       res.send(apiresponse)
                                       }
                                   else{
                                       taskModel.updateMany({'taskId':{$in:result1.tasks}},{$pull:{'viewers':req.body.sender}},(err,succ)=>{
                                           if(err){
                                               let apiresponse = response.generate(true,500, 'Database Error While accepting friend request', null)
                                               res.send(apiresponse)
                                               }
                                           else{
                                               let apiresponse = response.generate(false,200, 'you have beeen unfriend from user', null)
                                               res.send(apiresponse)
                                           }
                                       })
                                   }
                               })
                           }})
                   }})
            }
        })
    }
}

module.exports={
    login:login,
    signup:signup,
    getUserDetails:getUserDetails,
    logout:logout,
    getUserByEmail:getUserByEmail,
    getAllUsers:getAllUsers,
    resetPassword:resetPassword,
    sendRequest:sendRequest,
    removeRequest:removeRequest,
    getMySendRequests:getMySendRequests,
    acceptRequest:acceptRequest,
    unfriend:unfriend
}