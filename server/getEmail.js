import EmailsIndex from '../models/EmailsIndex'

export async function getEmail() {
    let indexNumber = 0
    const emailsIndex = await EmailsIndex.find()[0]
    let id = ''
    if (!emailsIndex) {
        const getId = await EmailsIndex.create({index: indexNumber})
        id = getId._id
    } else {
        indexNumber = emailsIndex.index
        id = emailsIndex._id
    }
    let emails = process.env.EMAILS
    emails = emails.split(', ')
    const emailIndices = emails.length - 1
    let email = ''
    if (indexNumber <= emailIndices) {
        email = emails[indexNumber]
    } else
        email = emails[0]
    let newIndexNumber = indexNumber + 1
    if (newIndexNumber > emailIndices)
        newIndexNumber = 0
    await EmailsIndex.updateOne({_id: id}, {$set: {index: newIndexNumber}})
    return email
}