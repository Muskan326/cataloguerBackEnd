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
const notifyModel=mongoose.model('Notification')


let saveNotification=(data)=>{
    if(data.viewers!=undefined && data.viewers.length>0){
        for(let each of data.viewers){
            let id=shortid.generate();
            let notify = new notifyModel({
                notifyId:id,
                userId:each,
                actionString:data.actionString,
                path:data.path                
            })
            notify.save((err,result)=>{
                if(err){
                    console.log(`not saved for  ${each}`)
                }
                else{
                    console.log(`saved for  ${each}`)
                }
            })
        }
    }

    if(data.receiver!=null ||data.receiver!=undefined){
        for(let each of data.receiver){
        let id=shortid.generate();
        let notify = new notifyModel({
            notifyId:id,
            userId:each.userId,
            actionString:data.actionString,
            path:data.path                
        })
        notify.save((err,result)=>{
            if(err){
                console.log(`not saved for request  ${err}`)
            }
            else if(result){
                console.log(`saved for request ${each.userId}`)
            }
        })
    }
}
}


let fetchNotifications=(req,res)=>{
    if(req.params.userId==null||req.params.userId==undefined){
        let apiresponse = response.generate(true, 403, 'Please pass the userId', null)
        res.send(apiresponse)
    }
    else{
        userModel.findOne({'userId':req.params.userId},(err,result)=>{
                   if(err){ let apiresponse = response.generate(true, 500, 'database error while verifying userId', null)
                    res.send(apiresponse)
                    }
                    else if(check.isEmpty(result)){
                        let apiresponse = response.generate(true, 404, 'User Id Not Found', null)
                        res.send(apiresponse)
                    }
                    else{
                        notifyModel.find({'userId':req.params.userId},(err,succ)=>{
                            if(err){
                                let apiresponse = response.generate(true, 500, 'database error while fetching Notification', null)
                                res.send(apiresponse)
                            }
                            else{
                                let apiresponse = response.generate(true, 200, 'All Notifications', succ)
                                res.send(apiresponse)
                            }
                        })
                    }
        })
    }
}

let markAllRead =(req,res)=>{
    if(req.params.userId==null||req.params.userId==undefined){
        let apiresponse = response.generate(true, 403, 'Please pass the userId', null)
        res.send(apiresponse)
    }
    else{
        userModel.findOne({'userId':req.params.userId},(err,result)=>{
                   if(err){ let apiresponse = response.generate(true, 500, 'database error while verifying userId', null)
                    res.send(apiresponse)
                    }
                    else if(check.isEmpty(result)){
                        let apiresponse = response.generate(true, 404, 'User Id Not Found', null)
                        res.send(apiresponse)
                    }
                    else{
                        notifyModel.remove({'userId':req.params.userId},(err,succ)=>{
                            if(err){
                                let apiresponse = response.generate(true, 500, 'database error while Reading  Notification', null)
                                res.send(apiresponse)
                            }
                            else{
                                let apiresponse = response.generate(true, 200, 'All Notifications Removed', null)
                                res.send(apiresponse)
                            }
                        })
                    }
        })
    }
}



let markOneRead=(req,res)=>{
    if(req.params.notifyId==null || req.params.notifyId==undefined){
        let apiresponse = response.generate(true, 403, 'Please pass the notification Id', null)
        res.send(apiresponse)
    }
    else{
        notifyModel.findOneAndRemove({'notifyId':req.params.notifyId},(err,result)=>{
            if(err){
                let apiresponse = response.generate(true, 500, 'database error while Deleting Notification', null)
                res.send(apiresponse)
            }
            else if(check.isEmpty(result)){
                let apiresponse = response.generate(true, 404, 'Notification Not Found', null)
                res.send(apiresponse)
            }
            else{
                let apiresponse = response.generate(false, 200, 'Notification Removed', null)
                res.send(apiresponse)
            }
        })
    }
}

module.exports={
    saveNotification:saveNotification,
    markAllRead:markAllRead,
    markOneRead:markOneRead,
    fetchNotifications:fetchNotifications
}