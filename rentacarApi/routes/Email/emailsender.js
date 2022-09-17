const env=require('../../models/.env.js')
const nodemailer=require('nodemailer')


async function verificationEmail(email,name,activationid){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: env.USERNAME, // generated ethereal user
          pass: env.PASSWORD, // generated ethereal password
        },
      });

      transporter.verify((error,success)=>{
          if(error){
              console.log(error)
          }
          else{
              console.log("ready")
              console.log(success)
          }
      })
    
      await transporter.sendMail({
        from: '', 
        to:email, 
        subject: "Rent A Car Account Activation",
        html: `<b>Hey ${name}Activation Id is${activationid}</b>`,
      });
}

async function forgotpass(email,name,passwordotp){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: env.USERNAME, // generated ethereal user
          pass: env.PASSWORD, // generated ethereal password
        },
      });

      transporter.verify((error,success)=>{
          if(error){
              console.log(error)
          }
          else{
              console.log("ready")
              console.log(success)
          }
      })
    
      await transporter.sendMail({
        from: '', 
        to:email, 
        subject: "Rent A Car Forgot Password",
        html: `<b>Hey ${name} Your New Password is${passwordotp}</b>`,
      });
}

module.exports={verificationEmail,forgotpass}