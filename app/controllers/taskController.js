const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib')
const check = require('../libs/checkLib');
const passcheck = require('../libs/generatePasswordLib')
const token = require('../libs/tokenLib');

const userModel = mongoose.model('User')
const taskModel = mongoose.model('Task')
const eventModel=mongoose.model('Event')

let createNewTask=(req,res)=>{
    if (check.isEmpty(req.body.title)) {
        let apiresponse = response.generate(true, 403, 'Please Enter Details to Create A new Task', null)
        res.send(apiresponse)
    }
    else{
        let id = shortid.generate()
        let created={
            userId:req.body.userId,
            userName:req.body.userName
        }
        let modify={
            userId:req.body.userId,
            userName:req.body.userName,
            modifyDate:time.now()
        }

        let task=new taskModel({
            taskId:id,
            title:req.body.title,
            description:req.body.description,
            createdBy:created,
            lastModified:modify,
            viewers:req.body.friends,
            headTask:id,
        })
        task.save((err,result)=>{
            if (err) {
                let apiresponse = response.generate(true, 500, 'Database Error While Creating task', null)
                res.send(apiresponse)
            }
            else{
                userModel.update({'userId':req.body.userId},{$push:{'tasks':result.taskId}},(err,success)=>{
                    if(err){
                        let apiresponse = response.generate(true, 500, 'Task Created But Unable to link to user', null)
                        res.send(apiresponse)
                    }
                    else if(success){
                        let apiresponse=response.generate(false,200,'Task Created Successfully',result)
                        res.send(apiresponse)
                    }
                })
            }
        })
    }
}

let getTaskDetail=(req,res)=>{
    if(check.isEmpty(req.params.taskId)){
        let apiresponse = response.generate(true, 400, 'Please Enter TaskId', null)
        res.send(apiresponse)
    }
    else{
        taskModel.findOne({'taskId':req.params.taskId},(err,result)=>{
            if(err){
                let apiresponse = response.generate(true, 500, 'Database Error. Cannot Fetch Details', null)
                res.send(apiresponse)
            }
            else if(check.isEmpty(result)|| result.viewers.length==0){
                let apiresponse = response.generate(true, 404, 'TaskId Not Found. Please Enter Correct Task Id', null)
                res.send(apiresponse)
            }
            else{
                let apiresponse = response.generate(false, 200, 'Task Details', result)
                res.send(apiresponse)
            }
        })
    }
}


let createSubTask=(req,res)=>{
    if (check.isEmpty(req.body.title)) {
        let apiresponse = response.generate(true, 400, 'Please Enter Details to Create A new Task', null)
        res.send(apiresponse)
    }
    else{
        takeBackUpAndSave("SubTask",req.body.headTask)
        let id = shortid.generate()
        let created={
            userId:req.query.userId,
            userName:req.query.userName
        }
        let modify={
            userId:req.query.userId,
            userName:req.query.userName,
            modifyDate:time.now()
        }
        let task=new taskModel({
            taskId:id,
            title:req.body.title,
            description:req.body.description,
            createdBy:created,
            lastModified:modify,
            viewers:req.body.friends,
            headTask:req.body.headTask,
            parents:req.body.ancestors
        })
        task.save((err,result)=>{
            if (err) {
                let apiresponse = response.generate(true, 500, 'Database Error While creating task', null)
                res.send(apiresponse)
            }
            else{
                userModel.update({'userId':req.body.userId},{$push:{'tasks':result.taskId}},(err,success)=>{
                    if(err){
                        let apiresponse=response.generate(false,500,'Task Created but unable to link to user',null)
                        res.send(apiresponse)
                    }
                    else if(success){
                        taskModel.updateMany({'taskId':{$in:req.body.ancestors}},{$set:{'lastModified':result.lastModified}},(err,succ)=>{
                            if(err){
                                let apiresponse=response.generate(false,500,'Task Created but parents last Modified Not Updated',null)
                                res.send(apiresponse)
                                    }
                            else if(succ){
                                taskModel.update({'taskId':req.body.parentTask},{$push:{'subTask':result.taskId}},(err,succ)=>{
                                    if(err){
                                        let apiresponse=response.generate(false,500,'Task Created but Not Linked to parent task',null)
                                        res.send(apiresponse)
                                    }
                                    else if(succ){
                                        let apiresponse=response.generate(false,200,'Task Created Successfully',result)
                                        res.send(apiresponse)
                                    }
                                })}})}
                })
                
                
                
            }
        })
    }
}


let deleteTask=(req,res)=>{
    if (check.isEmpty(req.body.taskId)) {
        let apiresponse = response.generate(true, 500, 'Please Enter The taskId To delete', null)
        res.send(apiresponse)
    }
    else{
        taskModel.findOne({'taskId':req.body.taskId},(err,result)=>{
            if (err) {
                let apiresponse = response.generate(true, 500, 'Database Error. Cant Find the Task', null)
                res.send(apiresponse)
            }
            else if (check.isEmpty(result)){
                let apiresponse = response.generate(true, 404, 'Given Task Does Not Exist', null)
                res.send(apiresponse)
            }
            else{
                takeBackUpAndSave("Delete",result.headTask)
                taskModel.update({'taskId':result.taskId},{$set:{'viewers':[]}},(err,succ)=>{
                    if(err){
                        let apiresponse = response.generate(false, 500 , 'Unable to delete Sub tasks', null)
                        res.send(apiresponse)
                    }
                    else if(succ){
                        taskModel.update({'subTask':req.body.taskId},{$pull:{'subTask':req.body.taskId}},(err,succ)=>{
                            if(err){
                                let apiresponse = response.generate(false, 500 , 'Sub Tasks Deleted but unable to unlink from parent task', null)
                                res.send(apiresponse)
                            }
                            else if(succ){
                                let modify={
                                    userId:req.query.userId,
                                    userName:req.query.userName,
                                    modifyDate:time.now()
                                }
                                taskModel.updateMany({'headTask':result.headTask},{$set:{'lastModified':modify}},(err,succ)=>{
                                    if (err) {
                                        let apiresponse = response.generate(true, 500, 'Task Updated But database error while updating last modified', null)
                                        res.send(apiresponse)
                                    }
                                    else{
                                        let apiresponse = response.generate(false, 200 , 'Task Ans its sub tasks deleted successfully', null)
                                        res.send(apiresponse)
                                    }
                                })
                                
                            }
                        })
                    }
                })         
                
                
            }
        })
    }
}


let getRelatedTask=(req,res)=>{
    if (check.isEmpty(req.params.userId)) {
        let apiresponse = response.generate(true, 403, 'Please Enter The User Id', null)
        res.send(apiresponse)
    }
    else{
        taskModel.find({'viewers':req.params.userId},(err,result)=>{
            if (err) {
                let apiresponse = response.generate(true, 500, 'Database Error. Unable To Find the user', `Total Length is ${result.length}`)
                res.send(apiresponse)
            }
            else{
                start=(req.query.page-1)*req.query.limit
                if(req.query.limit==0){ end=result.length }
                else{ end=start+req.query.limit }
                result=result.slice(start,end) 
                let apiresponse = response.generate(false, 200, 'List of related tasks', result)
                res.send(apiresponse)
            }
        })
    }

}

let editTask=(req,res)=>{
    if(req.body==null ||req.body==undefined){
        let apiresponse = response.generate(true, 403, 'Please Enter The Details', null)
        res.send(apiresponse)
    }
    else{
        takeBackUpAndSave("Edit",req.body.headTask)
        taskModel.findOneAndUpdate({'taskId':req.body.taskId},req.body, { multi: true }, (err, result) => {
            if (err) {
                let apiresponse = response.generate(true, 500, 'Error while editting Task', null)
                res.send(apiresponse)
            }
            else{
                let modify={
                    userId:req.query.userId,
                    userName:req.query.userName,
                    modifyDate:time.now()
                }
                taskModel.updateMany({'headTask':result.headTask},{$set:{'lastModified':modify}},(err,succ)=>{
                    if (err) {
                        let apiresponse = response.generate(true, 500, 'Task Updated But database error while updating last modified', null)
                        res.send(apiresponse)
                    }
                    else{
                        let apiresponse = response.generate(false, 200, 'Task Edited Successfully', result)
                        res.send(apiresponse)
                    }
                })
                
            }
        })
    }
}


let getHeadTasks=(req,res)=>{
    taskModel.find({'parents':[]},(err,result)=>{
        if(err){
        let apiresponse = response.generate(true, 500, 'Database Error While fetching the tasks', null)
        res.send(apiresponse)
        }
        else{
            if(result.length<(req.query.limit)){
                let apiresponse = response.generate(true,403, 'The records you are asking is out of bound. Please Send appropriate value',` Total Length is ${result.length}`)
                res.send(apiresponse)
            }
            else{
                start=(req.query.page-1)*req.query.limit
                if(req.query.limit==0){ end=result.length }
                else{ end=start+req.query.limit }
                result=result.slice(start,end) 
            let apiresponse = response.generate(true, 200, 'All Head Tasks in database', result)
            res.send(apiresponse) 
            }
        }
    })
}

let getAllParents=(req,res)=>{
    let parents=new Array
    if(req.body.taskId!=null|| req.body.taskId!=undefined){
        taskModel.findOne({'taskId':req.body.taskId},(err,succ)=>{
            if(err){
                let apiresponse = response.generate(true, 500, 'Database Error While feting Info', null)
                res.send(apiresponse)
            }
            else if(check.isEmpty(succ)){
                let apiresponse = response.generate(true, 404, 'Parent task Not Found', null)
                res.send(apiresponse)
            }
            else{
                for(let each of succ.parents){
                    parents.push(each)
                }
                parents.push(req.body.taskId)
                let apiresponse = response.generate(true, 200, 'Parent tasks', parents)
                res.send(apiresponse)
            }
        })
    }
}


let undo=(req,res)=>{
    eventModel.findOne({'headTask':req.body.taskId},(error,succ)=>{
        if(succ==null){
            taskModel.deleteMany({'parents':req.body.taskId},(err,succ)=>{
                if(err){
                    console.log("All Child not deleted")
                }
                else{
                    console.log("All Child deleted")
                }
            })
            let apiresponse=response.generate(true,400,'No More Actions to be undone',null)
            res.send(apiresponse)

        }
        else if(succ!=null){
            let copy=succ.copy
            let a=0
            for(let each of copy){
                taskModel.findOneAndUpdate({'taskId':each.taskId},each,(err,result)=>{
                    if(result){
                        a+=1
                    }
                if(a==copy.length){
                    eventModel.findOneAndRemove({'headTask':req.body.taskId,'eventNo':succ.eventNo},(err,success)=>{
                    if(success){
                        let modify={
                            userId:req.body.userId,
                            userName:req.body.userName,
                            modifyDate:time.now()
                        }
                        taskModel.findOne({'taskId':req.body.taskId},(err,result1)=>{
                            if(err){
                                console.log("last err "+err)
                                }
                            else{
                                taskModel.updateMany({'headTask':req.body.taskId},{$set:{'lastModified':modify,'viewers':result1.viewers}},(err,succ)=>
                                {
                            if(err){
                                console.log("last err "+err)
                                }
                            else if(succ){
                                console.log("last succ "+succ)
                                }
                        })
                            }
                        })
                        
                        let apiresponse=response.generate(false,200,'Last Action Undone Successfully',success.action)
                        res.send(apiresponse)
                    }
                })
            }
                })
            }
           
        }
    }).sort({'eventNo':-1}).limit(1)
}

let takeBackUpAndSave=(action,headTask)=>{
    taskModel.find({"headTask":headTask},{'_id':0,'viewers':0,'lastModified':0},(err,result)=>{
        if(err){
            return false
        }
        else{
            eventModel.findOne({'headTask':headTask},{'eventNo':1,'_id':0},(error,succ)=>{
                if(error){
                    return true
                }
                else{
                    let event;
                    if(succ==null){
                        event=0
                    }
                    else{
                        event=succ.eventNo
                    }
                    let data=new eventModel({
                        headTask:headTask,
                        eventNo:event+1,
                        copy:result,
                        action:action
                    })
                    data.save((prob,success)=>{
                        if(prob){
                            return false
                        }
                        else{
                            return true
                        }
                    })
                }
            }).sort({'eventNo':-1}).limit(1)
            
        }
    })
}



module.exports={
    createNewTask:createNewTask,
    getTaskDetail:getTaskDetail,
    createSubTask:createSubTask,
    deleteTask:deleteTask,
    getRelatedTask:getRelatedTask,
    editTask:editTask,
    getHeadTasks:getHeadTasks,
    getAllParents:getAllParents,
    undo:undo
}
