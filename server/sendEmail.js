import {getEmail} from "./getEmail";

const nodemailer = require('nodemailer')

export async function sendEmail(emailAddress, subject, message) {
    const user = await getEmail()
    console.log(user)
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: user,
            pass: 'Snapshooter1'
        },
        secure: true
    })

    await new Promise((resolve, reject) => {
        transporter.verify(function (error, success) {
            if (error) {
                reject(error)
            } else
                resolve(success)
        })
    })

    const mailData = {
        from: `D2R Crypto <${user}>`,
        to: emailAddress,
        subject: subject,
        html: message
    }

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                reject(err)
            } else
                resolve(info)
        })
    })
}