import nodemailer from 'nodemailer'

export async function sendEmail(emailAddress, subject, message) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
            }
        })
        const info = await transporter.sendMail({
            from: 'BlockCommerc <donotreply@blockcommerc.com>',
            to: emailAddress,
            subject: subject,
            html: message
        })
        return info.messageId
    } catch (e) {
        return null
    }
}
