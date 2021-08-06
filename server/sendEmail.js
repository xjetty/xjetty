const mailgun = require('mailgun-js')

export async function sendEmail(emailAddress, subject, message) {
    const apiKey = 'edd408673845457d6104448d7275a82a-64574a68-9e6f04a7'
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