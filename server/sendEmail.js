import fetch from 'node-fetch'

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'

const sendEmail = async ({emailAddress, subject, message}) => {
    await fetch(SENDGRID_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
        },
        body: JSON.stringify({
            personalizations: [
                {
                    to: [
                        {
                            emailAddress
                        }
                    ],
                    subject: subject
                }
            ],
            from: {
                email: 'noreply@blockcommerc.com',
                name: 'BlockCommerc'
            },
            content: [
                {
                    type: 'text/html',
                    value: message
                }
            ]
        })
    });
}

export {sendEmail};