const mailgun = require('mailgun-js')

export async function sendEmail(emailAddress, subject, message) {
    const apiKey = '57486ffe7c5dd0483e374bf2d484c14d-64574a68-71556a20'
    const DOMAIN = 'https://api.mailgun.net/v3/blockcommerc.com/messages'
    const mg = mailgun({apiKey: apiKey, domain: DOMAIN})
    const data = {
        from: 'BlockCommerc <noreply@blockcommerc.com>',
        to: emailAddress,
        subject: subject,
        text: message.replace(/(<([^>]+)>)/gi, ''),
        html: message
    }
    mg.messages().send(data, function (error, body) {
        if (!error) {
            return true
        } else
            return false
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