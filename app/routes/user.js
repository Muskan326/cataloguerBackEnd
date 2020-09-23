const express = require('express');
const userController = require("./../../app/controllers/userController");
const mailController = require("./../../app/controllers/mailController");
const taskController = require("./../../app/controllers/taskController");
const notifyController= require('./../../app/controllers/notifyController')
const appConfig = require("./../../config/appConfig")
const checking = require("./../middlewares/checkuser")
const pretty = require('express-prettify');
const pager=require('./../middlewares/paginate')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;
  
    app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
      next();
  });
  
    app.use(pretty());
    app.post(`${baseUrl}/login`,userController.login);
        /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /v1/login API for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Login Successful",            
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobile": "Number",
                "email": "String",
                "lastName": "String",
                "firstName": "String",
                "userId": "String",
                "code":"Number",
                "country":"String",
                "joined":"Date",
                "friends" :"Array",
                "requests" :"Array",
                "tasks" : "Array",
            }

        }
            @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Login Failed",
	    "data": null
	   }
    */
    app.post(`${baseUrl}/signup`, userController.signup);
      /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /v1/signup API for user signup.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} lastName lastName of the user. (body params) (required)
     * @apiParam {string} code country mobile code of the user. (body params) (required)
     * @apiParam {string} mobile mobile number of the user. (body params) (required)
     * @apiParam {string} gender gender of the user. (body params) (required)
     * @apiParam {string} country country of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "User Registered Successfully",
            "data": {
                "mobile": "Number",
                "email": "String",
                "lastName": "String",
                "firstName": "String",
                "userId": "String",
                "code":"Number",
                "country":"String",
                "joined":"Date",
                "friends" :"Array",
                "requests" :"Array",
                "tasks" : "Array",
        }

         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Error While Signing Up",
	    "data":error
	   }
	 */
    
    app.get(`${baseUrl}/get/:userId`,userController.getUserDetails);
          /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {get} /v1/get/:userId API for getting info of a user using his userId.
     *
     * @apiParam {string} userId userId of the user for which you want to find the details. (route params) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "User Registered Successfully",
            "data": {
                "mobile": "Number",
                "email": "String",
                "lastName": "String",
                "firstName": "String",
                "userId": "String",
                "code":"Number",
                "country":"String",
                "joined":"Date",
                "friends" :"Array",
                "requests" :"Array",
                "tasks" : "Array",
        }

         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Error While Fetching Info",
	    "data":error
	   }
	 */
    app.get(`${baseUrl}/logout/:userId`,userController.logout);
              /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {get} /v1/logout/:userId API for logging out a user.
     *
     * @apiParam {string} userId userId of the user who wants to logout. (body params) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Logged Out Successfully",
            "data":null     
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 404,
	    "message": "Already Logged Out or Invalid UserId",
	    "data":null
	   }
	 */

    app.get(`${baseUrl}/details/:email`,userController.getUserByEmail);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {get} /v1/details/:email  API for getting info of a user with his email.
     *
     * @apiParam {string} email emailId to check for existance of a user (route params) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "User Found",
            "data":{"mobile": "Number",
                "email": "String",
                "lastName": "String",
                "firstName": "String",
                "userId": "String",
                "code":"Number",
                "country":"String",
                "joined":"Date",
                "friends" :"Array",
                "requests" :"Array",
                "tasks" : "Array",
            }    
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Error while fetching user",
	    "data":null
	   }
	 */
    app.get(`${baseUrl}/allUsers`,pager.paginate,userController.getAllUsers)
        /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {get} /v1/allUsers?page&limit API for getting info of all the users on the portal.
     *
     * @apiParam {Number} page page number to fetch data. (query params ) (optional)
     * @apiParam {Number} limit limit of data for each page. (query params ) (optional)
     * 

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "User Found",
            "data":[{"mobile": "Number",
                "email": "String",
                "lastName": "String",
                "firstName": "String",
                "userId": "String",
                "code":"Number",
                "country":"String",
                "joined":"Date",
                "friends" :"Array",
                "requests" :"Array",
                "tasks" : "Array",
            }    ]
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error While fetching the Users",
	    "data":null
	   }
	 */
    app.post(`${baseUrl}/resetPassword`,userController.resetPassword)
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /v1/resetPassword API for resetting a password by email.
     *
     * @apiParam {string} email emailId for which the password has to be changed  (body params) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Password Changed Successfully",
            "data":null   
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error While Changing Password",
	    "data":null
	   }
	 */
    app.get(`${baseUrl}/changePassword/:email`,mailController.changePasswordMail);
     /**
     * @apiGroup mails
     * @apiVersion  1.0.0
     * @api {get} /v1/changePassword/:email API to send mail requesting to change password.
     *
     * @apiParam {string} email emailId for which the password has to be changed  (route params) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Recovery Mail Send Successfully",
            "data":null   
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Server Error: Recovery Email Not Send",
	    "data":null
	   }
	 */
    app.get(`${baseUrl}/verifyEmail/:email`,mailController.verifyEmail);
         /**
     * @apiGroup mails
     * @apiVersion  1.0.0
     * @api {get} /v1/verifyEmail/:email API for verifying email at the time of signup.
     *
     * @apiParam {string} email emailId for verification  (route params) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": " Mail Send Successfully",
            "data":null   
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Server Error: Recovery Email Not Send",
	    "data":null
	   }
	 */
    app.get(`${baseUrl}/allTasks`,pager.paginate,taskController.getHeadTasks)
             /**
     * @apiGroup task
     * @apiVersion  1.0.0
     * @api {get} /v1/allTasks?page&limit API to fetch all Headtasks in the portal.
     *
     * @apiParam {Number} page page number to fetch data. (query params ) (optional)
     * @apiParam {Number} limit limit of data for each page. (query params ) (optional)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": " All Head Tasks in database",
            "data":[{
                "taskId":"String",
                "title":"String",
                "description":"String",
                "status":"String",
                "headTask":"String",
                "parents":"Array",
                "subTask":"Array",
                "viewers":"Array",
                "createdOn":"Date",
                "createdBy":"Object",
                "lastModified":"Object"

            }]
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error While fetching the tasks",
	    "data":null
	   }
	 */
    app.post(`${baseUrl}/create`,checking.checkUser,taskController.createNewTask);
                 /**
     * @apiGroup task
     * @apiVersion  1.0.0
     * @api {post} /v1/create API to create a new HeadTask.
     *
     * @apiParam {string} title title of the head task (body param) (required)
     * @apiParam {string} description description of the head task (body params ) (optional)
     * @apiParam {string} userId userId of the creator. (body params ) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Task Created Successfully",
            "data":{
                "taskId":"String",
                "title":"String",
                "description":"String",
                "status":"String",
                "headTask":"String",
                "parents":"Array",
                "subTask":"Array",
                "viewers":"Array",
                "createdOn":"Date",
                "createdBy":"Object",
                "lastModified":"Object"

            }
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error While Creating task",
	    "data":null
	   }
	 */
    app.post(`${baseUrl}/subTask`,checking.isAuthorised,checking.checkUser,taskController.createSubTask);
                     /**
     * @apiGroup task
     * @apiVersion  1.0.0
     * @api {post} /v1/subTask API to create a sub task.
     *
     * @apiParam {string} title title of the sub task (body param) (required)
     * @apiParam {string} description description of the sub task (body params ) (optional)
     * @apiParam {string} userId userId of the creator. (body params ) (required)
     * @apiParam {string} parentTask taskId of the immediate Parent task. (body params ) (required)
     * @apiParam {string} ancestors array of all the parent tasks. (body params ) (required)
     * @apiParam {string} headTask taskId of the head task of the tas hierarchy. (body params ) (required)
     * @apiParam {string} taskId taskId of the immediate Parent task to check for authorization of user. (body params ) (required)

     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Task Created Successfully",
            "data":{
                "taskId":"String",
                "title":"String",
                "description":"String",
                "status":"String",
                "headTask":"String",
                "parents":"Array",
                "subTask":"Array",
                "viewers":"Array",
                "createdOn":"Date",
                "createdBy":"Object",
                "lastModified":"Object"

            }
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error While Creating task",
	    "data":null
	   }
	 */
    app.post(`${baseUrl}/getAllParents`,taskController.getAllParents)
    /**
     * @apiGroup task
     * @apiVersion  1.0.0
     * @api {post} /v1/all  API to get all the ancestor tasks of a task.
     *
     * @apiParam {string} taskId taskId to find the parent tasks. (body params ) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Parent tasks",
            "data":["String"(Array of all the parent task Ids)]
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error While feting Info",
	    "data":null
	   }
	 */
    app.post(`${baseUrl}/delete`,checking.isAuthorised,taskController.deleteTask);
      /**
     * @apiGroup task
     * @apiVersion  1.0.0
     * @api {post} /v1/delete API to delete a task using the taskId.
     * 
     * @apiParam {string} userId userId of the user who is deleting the task. (body params ) (required)
     * @apiParam {string} taskId taskId to be deleted . (body params ) (required)
     * 

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Task Ans its sub tasks deleted successfully",
            "data":null
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error. Cant Find the Task",
	    "data":null
	   }
	 */
    app.get(`${baseUrl}/getRelated/:userId`,pager.paginate,taskController.getRelatedTask)
      /**
     * @apiGroup task
     * @apiVersion  1.0.0
     * @api {get} /v1/getRelated/:userId?page&limit API for getting all the tasks related to a user.
     *
     * @apiParam {string} userId userId for which we want related tasks. (route params) (required)
     * @apiParam {Number} page page number to fetch data. (query params ) (optional)
     * @apiParam {Number} limit limit of data for each page. (query params ) (optional)
     * 

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "List of related tasks",
            "data":[{"mobile": "Number",
                "email": "String",
                "lastName": "String",
                "firstName": "String",
                "userId": "String",
                "code":"Number",
                "country":"String",
                "joined":"Date",
                "friends" :"Array",
                "requests" :"Array",
                "tasks" : "Array",
            }    ]
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error. Unable To Find the user",
	    "data":null
	   }
	 */
    app.post(`${baseUrl}/editTask`,checking.isAuthorised,taskController.editTask)
       /**
     * @apiGroup task
     * @apiVersion  1.0.0
     * @api {post} /v1/editTask API to edit a task .
     *
     * @apiParam {string} taskId taskId of the task to fetch details (body param ) (required)
     * @apiParam {string} title title of the  task (body param) (required)
     * @apiParam {string} description description of the  task (body params ) (optional)
     * @apiParam {string} status status of the  task (body params ) (optional)
     * @apiParam {string} userId userId of the editor. (body params ) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Task Edited Successfully",
            "data":{
                "taskId":"String",
                "title":"String",
                "description":"String",
                "status":"String",
                "headTask":"String",
                "parents":"Array",
                "subTask":"Array",
                "viewers":"Array",
                "createdOn":"Date",
                "createdBy":"Object",
                "lastModified":"Object"

            }
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Error while editting Task",
	    "data":null
	   }
	 */
    app.get(`${baseUrl}/taskDetails/:taskId`,taskController.getTaskDetail)
           /**
     * @apiGroup task
     * @apiVersion  1.0.0
     * @api {get} /v1/taskDetails/:taskId API to get details of a task using task Id.
     *
     * @apiParam {string} taskId taskId of the task to fetch details (route param ) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Task Details",
            "data":{
                "taskId":"String",
                "title":"String",
                "description":"String",
                "status":"String",
                "headTask":"String",
                "parents":"Array",
                "subTask":"Array",
                "viewers":"Array",
                "createdOn":"Date",
                "createdBy":"Object",
                "lastModified":"Object"

            }
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error. Cannot Fetch Details",
	    "data":null
	   }
	 */
    app.post(`${baseUrl}/sendRequest`,userController.sendRequest)
      /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /v1/sendRequest API to send friend request to another user.
     *
     * @apiParam {string} sender userId of the sender (body param ) (required)
     * @apiParam {string} senderName username of the sender. (body params ) (required)
     * @apiParam {string} receiver userId of the receiver. (body params ) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Friend Request Send Sucessfully",
            "data":null
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error while sending friend request",
	    "data":null
	   }
	 */
    app.post(`${baseUrl}/removeRequest`,userController.removeRequest)
          /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /v1/removeRequest API to remove send friend request from a user.
     *
     * @apiParam {string} sender userId of the sender (body param ) (required)
     * @apiParam {string} receiver userId of the receiver. (body params ) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Friend Request removed Sucessfully",
            "data":null
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error while removing friend request",
	    "data":null
	   }
	 */
    app.post(`${baseUrl}/acceptRequest`,userController.acceptRequest)
     /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /v1/acceptRequest API to accept a friend request from another user.
     *
     * @apiParam {string} sender userId of the sender (body param ) (required)
     * @apiParam {string} senderName Full name of the sender (body param ) (required)
     * @apiParam {string} receiver userId of the receiver. (body params ) (required)
     * @apiParam {string} receiverName fullname of the receiver (body param ) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Request Accepted",
            "data":null
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error while accepting friend request",
	    "data":null
	   }
	 */
    app.post(`${baseUrl}/unfriend`,userController.unfriend)
         /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /v1/unfriend API to unfriend a user.
     *
     * @apiParam {string} sender userId of the sender (body param ) (required)
     * @apiParam {string} receiver userId of the receiver. (body params ) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "you have beeen unfriend from user",
            "data":null
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error While removing from friends",
	    "data":null
	   }
	 */
    app.get(`${baseUrl}/getMySendRequests/:userId`,userController.getMySendRequests)
             /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {get} /v1/getMySendRequests/:userId API to get list of all friend requests send by the user.
     *
     * @apiParam {string} userId userId of the sender (route param ) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Send Request details",
            "data":[{"mobile": "Number",
                "email": "String",
                "lastName": "String",
                "firstName": "String",
                "userId": "String",
                "code":"Number",
                "country":"String",
                "joined":"Date",
                "friends" :"Array",
                "requests" :"Array",
                "tasks" : "Array",
            }    ]
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error While getting send friend request",
	    "data":null
	   }
	 */
    app.post(`${baseUrl}/undo`,checking.isAuthorised,taskController.undo)
                 /**
     * @apiGroup task
     * @apiVersion  1.0.0
     * @api {post} /v1/undo API to undo last action on the headtask.
     *
     * @apiParam {string} taskId taskid of the head task to undo last action (body param ) (required)
     * @apiParam {string} userId userId of the user undoing the task (body param ) (required)
     * @apiParam {string} username username of the user undoing the task (body param ) (required)
     *

     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "Last Action Undone Successfully",
            "data":"action performed"
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "Database Error ",
	    "data":null
	   }
	 */


   app.get(`${baseUrl}/getNotification/:userId`,notifyController.fetchNotifications)

    /**
     * @apiGroup notification
     * @apiVersion  1.0.0
     * @api {get} /v1/getNotification/:userId API to undo last action on the headtask.
     *
     * @apiParam {string} userId userId of the user whose notifications are to be fetched (route param ) (required)
     *
     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "All Notifications",
            "data":[
              {
                "notifyId":"String",
                "userId":"String",
                "actionString":"String",
                "path":"String"
              }
            ]
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "database error while fetching Notification ",
	    "data":null
	   }
	 */

   app.get(`${baseUrl}/markAsRead/:userId`,notifyController.markAllRead)

      /**
     * @apiGroup notification
     * @apiVersion  1.0.0
     * @api {get} /v1/markAsRead/:userId API to undo last action on the headtask.
     *
     * @apiParam {string} userId userId of the user whose all notifications are to be marked as read (route param ) (required)
     *
     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": "All Notifications Removed",
            "data":null
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "database error while reading Notification ",
	    "data":null
	   }
	 */

   app.get(`${baseUrl}/markOneRead/:notifyId`,notifyController.markOneRead)

         /**
     * @apiGroup notification
     * @apiVersion  1.0.0
     * @api {get} /v1/markOneRead/:userId API to undo last action on the headtask.
     *
     * @apiParam {string} notifyId notifyId to be marked as read (route param ) (required)
     *
     * 
     * @apiSuccessExample {json} Success-Response:
         {
            "error": false,
            "status": 200,
            "message": " Notification Removed",
            "data":null
    
         @apiErrorExample {json} Error-Response:
	 *
	 * {
        "error": true,
        "status": 500,
	    "message": "database error while reading Notification ",
	    "data":null
	   }
	 */


}
