const sgMail = require('@sendgrid/mail')

export async function sendEmail(emailAddress, subject, message) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: emailAddress,
        from: 'BlockCommerc <noreply@blockcommerc.com>',
        subject: subject,
        text: message.replace(/(<([^>]+)>)/gi, ''),
        html: message
    }
    try {
        await sgMail.send(msg)
        return true
    } catch (e) {
        return false
    }
}