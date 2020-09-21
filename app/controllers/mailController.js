const nodemailer = require('nodemailer'); 
const response = require('../libs/responseLib')
const mongoose = require('mongoose');
const check = require('../libs/checkLib');
const passcheck = require('../libs/generatePasswordLib')


const userModel = mongoose.model('User')


let mailTransporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user: 'donotreply.cataloguer@gmail.com', 
		pass: 'cataloguer123'
	} 
}); 


let changePasswordMail=(req,res)=>{

userModel.findOne({'email':req.params.email},(error,result)=>{
	if(error){
		let apiResponse = response.generate(true, 500, "Database Error. Can't Fetch Information.", null)
        res.send(apiResponse)
	}
	else if (check.isEmpty(result)){
		let apiResponse = response.generate(true, 404, "Email address Not Found", null)
        res.send(apiResponse)
	}
	else{
			userModel.findOneAndUpdate({'email':req.params.email},{'password':passcheck.hashpassword(result.userId)},(err,succ)=>
			{
				if(err){

				}
				else{
					let mailDetails = { 
					from: 'donotreply.cataloguer@gmail.com', 
					to: req.params.email, 
					subject: 'Request To Change Password', 
					text: 'Click On The Below Button to set new password and recover the account',
					html:`<h1>This Mail is send to you on request for password change </h1>
					<body>
						Your New Password is ${result.userId}
					</body>`
					}
					mailTransporter.sendMail(mailDetails,(not, data)=> { 
						if(not) { 
							let apiresponse=response.generate(true,500,"Server Error: Recovery Email Not Send",not)
							res.send(apiresponse)
						} else { 
							let apiresponse=response.generate(false,200,"Recovery Mail Send Successfully",null)
							res.send(apiresponse)
						}})
				}
			})

		
				
		}
		
		
	})}


let verifyEmail=(req,res)=>{
	let mailDetails={
		from: 'donotreply.cataloguer@gmail.com', 
					to: req.params.email, 
					subject: 'Verify Email For Signup on Cataloguer-A ToDo list Application', 
					text: 'Click On The Below Button to set new password and recover the account',
					html:`<h3>This Mail is send to you verify your Email </h3>`
	}
	mailTransporter.sendMail(mailDetails,(not, data)=> { 
		if(not) { 
			let apiresponse=response.generate(true,500,"Server Error: Email Not Send",not)
			res.send(apiresponse)
		} else { 
			let apiresponse=response.generate(false,200," Mail Send Successfully",null)
			res.send(apiresponse)
		}})
}

module.exports={
	changePasswordMail:changePasswordMail,
	verifyEmail:verifyEmail
}
