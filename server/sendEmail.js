const mailgun = require('mailgun-js')

export async function sendEmail(emailAddress, subject, message) {
    const apiKey = '9eb39337f0331d85660b0bac7f88aa3f-64574a68-c910f7b2'
    const DOMAIN = 'blockcommerc.com'
    const mg = mailgun({apiKey: apiKey, domain: DOMAIN})
    const data = {
        from: 'BlockCommerc <noreply@blockcommerc.com>',
        to: emailAddress,
        subject: subject,
        text: message.replace(/(<([^>]+)>)/gi, ''),
        html: message
    }
    mg.messages().send(data, function (error, body) {
        return error
    })
}


// const sgMail = require('@sendgrid/mail')
//
// export async function sendEmail(emailAddress, subject, message) {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//     const msg = {
//         to: emailAddress,
//         from: 'BlockCommerc <noreply@blockcommerc.com>',
//         subject: subject,
//         text: message.replace(/(<([^>]+)>)/gi, ''),
//         html: message
//     }
//     try {
//         await sgMail.send(msg)
//         return true
//     } catch (e) {
//         return false
//     }
// }