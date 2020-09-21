define({ "api": [
  {
    "group": "mails",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/cataloguer/changePassword/:email",
    "title": "API to send mail requesting to change password.",
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
    "name": "GetApiV1CataloguerChangepasswordEmail"
  },
  {
    "group": "mails",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/cataloguer/verifyEmail/:email",
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
    "name": "GetApiV1CataloguerVerifyemailEmail"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/cataloguer/allTasks?page&limit",
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
    "name": "GetApiV1CataloguerAlltasksPageLimit"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/cataloguer/getRelated/:userId?page&limit",
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
    "name": "GetApiV1CataloguerGetrelatedUseridPageLimit"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/cataloguer/taskDetails/:taskId",
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
    "name": "GetApiV1CataloguerTaskdetailsTaskid"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/all",
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
    "name": "PostApiV1CataloguerAll"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/create",
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
    "name": "PostApiV1CataloguerCreate"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/delete",
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
    "name": "PostApiV1CataloguerDelete"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/editTask",
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
    "name": "PostApiV1CataloguerEdittask"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/subTask",
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
    "name": "PostApiV1CataloguerSubtask"
  },
  {
    "group": "task",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/undo",
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
    "name": "PostApiV1CataloguerUndo"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/cataloguer/allUsers?page&limit",
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
    "name": "GetApiV1CataloguerAllusersPageLimit"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/cataloguer/details/:email",
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
    "name": "GetApiV1CataloguerDetailsEmail"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/cataloguer/get/:userId",
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
    "name": "GetApiV1CataloguerGetUserid"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/cataloguer/getMySendRequests/:userId",
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
    "name": "GetApiV1CataloguerGetmysendrequestsUserid"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/cataloguer/logout/:userId",
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
    "name": "GetApiV1CataloguerLogoutUserid"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/acceptRequest",
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
    "name": "PostApiV1CataloguerAcceptrequest"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/login",
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
    "name": "PostApiV1CataloguerLogin"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/removeRequest",
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
    "name": "PostApiV1CataloguerRemoverequest"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/resetPassword",
    "title": "API for resetting a password by email.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>emailId for which the password has to be changed  (body params) (required)</p>"
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
    "name": "PostApiV1CataloguerResetpassword"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/sendRequest",
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
    "name": "PostApiV1CataloguerSendrequest"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/signup",
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
    "name": "PostApiV1CataloguerSignup"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/cataloguer/unfriend",
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
    "name": "PostApiV1CataloguerUnfriend"
  }
] });
