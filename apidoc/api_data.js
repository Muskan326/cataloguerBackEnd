define({ "api": [
  {
    "group": "mails",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/changePassword/:email",
    "title": "API to send mail with a new password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>emailId for which the password has to be changed  (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Recovery Mail Send Successfully\",\n   \"data\":null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Server Error: Recovery Email Not Send\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "mails",
    "name": "GetV1ChangepasswordEmail"
  },
  {
    "group": "mails",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/verifyEmail/:email",
    "title": "API for verifying email at the time of signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>emailId for verification  (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \" Mail Send Successfully\",\n   \"data\":null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Server Error: Recovery Email Not Send\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "mails",
    "name": "GetV1VerifyemailEmail"
  },
  {
    "group": "notification",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/getNotification/:userId",
    "title": "API to get all notifications for a user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user whose notifications are to be fetched (route param ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"All Notifications\",\n   \"data\":[\n     {\n       \"notifyId\":\"String\",\n       \"userId\":\"String\",\n       \"actionString\":\"String\",\n       \"path\":\"String\"\n     }\n   ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"database error while fetching Notification \",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "notification",
    "name": "GetV1GetnotificationUserid"
  },
  {
    "group": "notification",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/markAsRead/:userId",
    "title": "API to mark all notification as Read for a user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user whose all notifications are to be marked as read (route param ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"All Notifications Removed\",\n   \"data\":null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"database error while reading Notification \",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "notification",
    "name": "GetV1MarkasreadUserid"
  },
  {
    "group": "notification",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/markOneRead/:userId",
    "title": "API to mark one notification as Read.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "notifyId",
            "description": "<p>notifyId to be marked as read (route param ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \" Notification Removed\",\n   \"data\":null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"database error while reading Notification \",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "notification",
    "name": "GetV1MarkonereadUserid"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/allHeadTasks?page&limit",
    "title": "API to fetch all Headtasks in the portal.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>page number to fetch data. (query params ) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit of data for each page. (query params ) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \" All Head Tasks in database\",\n   \"data\":[{\n       \"taskId\":\"String\",\n       \"title\":\"String\",\n       \"description\":\"String\",\n       \"status\":\"String\",\n       \"headTask\":\"String\",\n       \"parents\":\"Array\",\n       \"subTask\":\"Array\",\n       \"viewers\":\"Array\",\n       \"createdOn\":\"Date\",\n       \"createdBy\":\"Object\",\n       \"lastModified\":\"Object\"\n\n   }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error While fetching the tasks\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "task",
    "name": "GetV1AllheadtasksPageLimit"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/allTasks?page&limit",
    "title": "API to fetch all tasks in the portal.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>page number to fetch data. (query params ) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit of data for each page. (query params ) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"status\": 200,\n \"message\": \" All Tasks in database\",\n \"data\":[{\n     \"taskId\":\"String\",\n     \"title\":\"String\",\n     \"description\":\"String\",\n     \"status\":\"String\",\n     \"headTask\":\"String\",\n     \"parents\":\"Array\",\n     \"subTask\":\"Array\",\n     \"viewers\":\"Array\",\n     \"createdOn\":\"Date\",\n     \"createdBy\":\"Object\",\n     \"lastModified\":\"Object\"\n\n }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"status\": 500,\n\"message\": \"Database Error While fetching the info\",\n\"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "task",
    "name": "GetV1AlltasksPageLimit"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/getRelated/:userId?page&limit",
    "title": "API for getting all the tasks related to a user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId for which we want related tasks. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>page number to fetch data. (query params ) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit of data for each page. (query params ) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"List of related tasks\",\n   \"data\":[{\"mobile\": \"Number\",\n       \"email\": \"String\",\n       \"lastName\": \"String\",\n       \"firstName\": \"String\",\n       \"userId\": \"String\",\n       \"code\":\"Number\",\n       \"country\":\"String\",\n       \"joined\":\"Date\",\n       \"friends\" :\"Array\",\n       \"requests\" :\"Array\",\n       \"tasks\" : \"Array\",\n   }    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error. Unable To Find the user\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "task",
    "name": "GetV1GetrelatedUseridPageLimit"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/taskDetails/:taskId",
    "title": "API to get details of a task using task Id.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the task to fetch details (route param ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Task Details\",\n   \"data\":{\n       \"taskId\":\"String\",\n       \"title\":\"String\",\n       \"description\":\"String\",\n       \"status\":\"String\",\n       \"headTask\":\"String\",\n       \"parents\":\"Array\",\n       \"subTask\":\"Array\",\n       \"viewers\":\"Array\",\n       \"createdOn\":\"Date\",\n       \"createdBy\":\"Object\",\n       \"lastModified\":\"Object\"\n\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error. Cannot Fetch Details\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "task",
    "name": "GetV1TaskdetailsTaskid"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/all",
    "title": "API to get all the ancestor tasks of a task.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId to find the parent tasks. (body params ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Parent tasks\",\n   \"data\":[\"String\"(Array of all the parent task Ids)]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error While feting Info\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "task",
    "name": "PostV1All"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/create",
    "title": "API to create a new HeadTask.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the head task (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the head task (body params ) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the creator. (body params ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Task Created Successfully\",\n   \"data\":{\n       \"taskId\":\"String\",\n       \"title\":\"String\",\n       \"description\":\"String\",\n       \"status\":\"String\",\n       \"headTask\":\"String\",\n       \"parents\":\"Array\",\n       \"subTask\":\"Array\",\n       \"viewers\":\"Array\",\n       \"createdOn\":\"Date\",\n       \"createdBy\":\"Object\",\n       \"lastModified\":\"Object\"\n\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error While Creating task\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "task",
    "name": "PostV1Create"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/delete",
    "title": "API to delete a task using the taskId.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user who is deleting the task. (body params ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId to be deleted . (body params ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Task Ans its sub tasks deleted successfully\",\n   \"data\":null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error. Cant Find the Task\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "task",
    "name": "PostV1Delete"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/editTask",
    "title": "API to edit a task .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the task to fetch details (body param ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the  task (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the  task (body params ) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of the  task (body params ) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the editor. (body params ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Task Edited Successfully\",\n   \"data\":{\n       \"taskId\":\"String\",\n       \"title\":\"String\",\n       \"description\":\"String\",\n       \"status\":\"String\",\n       \"headTask\":\"String\",\n       \"parents\":\"Array\",\n       \"subTask\":\"Array\",\n       \"viewers\":\"Array\",\n       \"createdOn\":\"Date\",\n       \"createdBy\":\"Object\",\n       \"lastModified\":\"Object\"\n\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Error while editting Task\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "task",
    "name": "PostV1Edittask"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/subTask",
    "title": "API to create a sub task.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the sub task (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the sub task (body params ) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the creator. (body params ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "parentTask",
            "description": "<p>taskId of the immediate Parent task. (body params ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ancestors",
            "description": "<p>array of all the parent tasks. (body params ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "headTask",
            "description": "<p>taskId of the head task of the tas hierarchy. (body params ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the immediate Parent task to check for authorization of user. (body params ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Task Created Successfully\",\n   \"data\":{\n       \"taskId\":\"String\",\n       \"title\":\"String\",\n       \"description\":\"String\",\n       \"status\":\"String\",\n       \"headTask\":\"String\",\n       \"parents\":\"Array\",\n       \"subTask\":\"Array\",\n       \"viewers\":\"Array\",\n       \"createdOn\":\"Date\",\n       \"createdBy\":\"Object\",\n       \"lastModified\":\"Object\"\n\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error While Creating task\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "task",
    "name": "PostV1Subtask"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/undo",
    "title": "API to undo last action on the headtask.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskid of the head task to undo last action (body param ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user undoing the task (body param ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user undoing the task (body param ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Last Action Undone Successfully\",\n   \"data\":\"action performed\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error \",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "task",
    "name": "PostV1Undo"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/allUsers?page&limit",
    "title": "API for getting info of all the users on the portal.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>page number to fetch data. (query params ) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit of data for each page. (query params ) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"User Found\",\n   \"data\":[{\"mobile\": \"Number\",\n       \"email\": \"String\",\n       \"lastName\": \"String\",\n       \"firstName\": \"String\",\n       \"userId\": \"String\",\n       \"code\":\"Number\",\n       \"country\":\"String\",\n       \"joined\":\"Date\",\n       \"friends\" :\"Array\",\n       \"requests\" :\"Array\",\n       \"tasks\" : \"Array\",\n   }    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error While fetching the Users\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "GetV1AllusersPageLimit"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/details/:email",
    "title": "API for getting info of a user with his email.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>emailId to check for existance of a user (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"User Found\",\n   \"data\":{\"mobile\": \"Number\",\n       \"email\": \"String\",\n       \"lastName\": \"String\",\n       \"firstName\": \"String\",\n       \"userId\": \"String\",\n       \"code\":\"Number\",\n       \"country\":\"String\",\n       \"joined\":\"Date\",\n       \"friends\" :\"Array\",\n       \"requests\" :\"Array\",\n       \"tasks\" : \"Array\",\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Error while fetching user\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "GetV1DetailsEmail"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/get/:userId",
    "title": "API for getting info of a user using his userId.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user for which you want to find the details. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"status\": 200,\n    \"message\": \"User Registered Successfully\",\n    \"data\": {\n        \"mobile\": \"Number\",\n        \"email\": \"String\",\n        \"lastName\": \"String\",\n        \"firstName\": \"String\",\n        \"userId\": \"String\",\n        \"code\":\"Number\",\n        \"country\":\"String\",\n        \"joined\":\"Date\",\n        \"friends\" :\"Array\",\n        \"requests\" :\"Array\",\n        \"tasks\" : \"Array\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Error While Fetching Info\",\n\t    \"data\":error\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "GetV1GetUserid"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/getMySendRequests/:userId",
    "title": "API to get list of all friend requests send by the user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the sender (route param ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Send Request details\",\n   \"data\":[{\"mobile\": \"Number\",\n       \"email\": \"String\",\n       \"lastName\": \"String\",\n       \"firstName\": \"String\",\n       \"userId\": \"String\",\n       \"code\":\"Number\",\n       \"country\":\"String\",\n       \"joined\":\"Date\",\n       \"friends\" :\"Array\",\n       \"requests\" :\"Array\",\n       \"tasks\" : \"Array\",\n   }    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error While getting send friend request\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "GetV1GetmysendrequestsUserid"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/logout/:userId",
    "title": "API for logging out a user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user who wants to logout. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Logged Out Successfully\",\n   \"data\":null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 404,\n\t    \"message\": \"Already Logged Out or Invalid UserId\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "GetV1LogoutUserid"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/acceptRequest",
    "title": "API to accept a friend request from another user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sender",
            "description": "<p>userId of the sender (body param ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderName",
            "description": "<p>Full name of the sender (body param ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiver",
            "description": "<p>userId of the receiver. (body params ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiverName",
            "description": "<p>fullname of the receiver (body param ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Request Accepted\",\n   \"data\":null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error while accepting friend request\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostV1Acceptrequest"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/login",
    "title": "API for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"status\": 200,\n    \"message\": \"Login Successful\",            \n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc\",\n        \"userDetails\": {\n        \"mobile\": \"Number\",\n        \"email\": \"String\",\n        \"lastName\": \"String\",\n        \"firstName\": \"String\",\n        \"userId\": \"String\",\n        \"code\":\"Number\",\n        \"country\":\"String\",\n        \"joined\":\"Date\",\n        \"friends\" :\"Array\",\n        \"requests\" :\"Array\",\n        \"tasks\" : \"Array\",\n    }\n\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Login Failed\",\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostV1Login"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/removeRequest",
    "title": "API to remove send friend request from a user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sender",
            "description": "<p>userId of the sender (body param ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiver",
            "description": "<p>userId of the receiver. (body params ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Friend Request removed Sucessfully\",\n   \"data\":null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error while removing friend request\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostV1Removerequest"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/resetPassword",
    "title": "API for resetting a password by email after account recovery.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email Id for which the password has to be changed  (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>oldpassword set by system   (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "newPassword",
            "description": "<p>new password of the user (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Password Changed Successfully\",\n   \"data\":null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error While Changing Password\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostV1Resetpassword"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/sendRequest",
    "title": "API to send friend request to another user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sender",
            "description": "<p>userId of the sender (body param ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderName",
            "description": "<p>username of the sender. (body params ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiver",
            "description": "<p>userId of the receiver. (body params ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Friend Request Send Sucessfully\",\n   \"data\":null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error while sending friend request\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostV1Sendrequest"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/signup",
    "title": "API for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>country mobile code of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobile",
            "description": "<p>mobile number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "gender",
            "description": "<p>gender of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": "<p>country of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"status\": 200,\n    \"message\": \"User Registered Successfully\",\n    \"data\": {\n        \"mobile\": \"Number\",\n        \"email\": \"String\",\n        \"lastName\": \"String\",\n        \"firstName\": \"String\",\n        \"userId\": \"String\",\n        \"code\":\"Number\",\n        \"country\":\"String\",\n        \"joined\":\"Date\",\n        \"friends\" :\"Array\",\n        \"requests\" :\"Array\",\n        \"tasks\" : \"Array\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Error While Signing Up\",\n\t    \"data\":error\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostV1Signup"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/unfriend",
    "title": "API to unfriend a user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sender",
            "description": "<p>userId of the sender (body param ) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiver",
            "description": "<p>userId of the receiver. (body params ) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"you have beeen unfriend from user\",\n   \"data\":null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"status\": 500,\n\t    \"message\": \"Database Error While removing from friends\",\n\t    \"data\":null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostV1Unfriend"
  }
] });
