const sgMail = require('@sendgrid/mail')

export async function sendEmail(emailAddress, subject, message) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: emailAddress,
        from: 'BlockCommerc <noreply@blockcommerc.com>',
        subject: subject,
        html: message
    }
    sgMail
        .send(msg)
        .then(() => {
            return true
        })
        .catch((error) => {
            return false
        })
}