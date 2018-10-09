const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const {server} = require('../../../config/setting')
let {mailInfo} = server

const sendMails = (mail, html) => {
  let transporter = nodemailer.createTransport(smtpTransport({
      host: mailInfo.host || "smtp.163.com",
      secureConnection: true,
      port: 465,
      auth: {
          user: mailInfo.user,
          pass: mailInfo.pass,
      }
  }));
  let sendmail = () => {
      var option = {
          from: `rncms<${mailInfo.user}>`,
          to: `${mail}`,
          headers: {
              "X-Mailer": "Microsoft Outlook Express 6.00.2900.2869"
          },
          date: new Date()
      }
      option.subject = 'rncms'
      option.html = html
      transporter.sendMail(option, function(error, response){
          if(error) {
              console.log("fail: " + error)
          } else {
              console.log("success:" + response.response)
          }
      });
  }
  sendmail()
}

module.exports = {
  sendMails
}