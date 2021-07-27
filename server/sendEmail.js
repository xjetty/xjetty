const sgMail = require('@sendgrid/mail')

export async function sendEmail(emailAddress, subject, message) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: emailAddress,
        from: 'BlockCommerc <noreply@blockcommerc.com>',
        subject: subject,
        html: message
    }
    let res = null
    try {
        res = await sgMail.send(msg)
        return res
    } catch (e) {
        return res
    }
}