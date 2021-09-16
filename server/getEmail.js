import BlockcommercEmailIndexNumber from '../models/BlockcommercEmailIndexNumber'

export async function getEmail() {
    let indexNumber = 0
    let emailsIndex = await BlockcommercEmailIndexNumber.find()
    emailsIndex = emailsIndex[0]
    let id = ''
    if (!emailsIndex) {
        const getId = await BlockcommercEmailIndexNumber.create({index: indexNumber})
        id = getId._id
    } else {
        indexNumber = emailsIndex.index
        id = emailsIndex._id
    }
    let emails = process.env.EMAILS
    emails = emails.split(', ')
    const emailIndices = emails.length - 1
    let email = ''
    let newIndexNumber = 0
    if (indexNumber <= emailIndices) {
        email = emails[indexNumber]
    } else
        email = emails[0]
    newIndexNumber = indexNumber + 1
    await BlockcommercEmailIndexNumber.updateOne({_id: id}, {$set: {index: newIndexNumber}})
    return email
}