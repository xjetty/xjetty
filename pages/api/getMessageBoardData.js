import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import MessageBoard from '../../models/MessageBoard'
import connectToDb from "../../middleware/connectToDb";
import {getDataFromToken} from "../../server/getDataFromToken";
import Escrow from '../../models/Escrow'
import Dispute from '../../models/Dispute'

const getMessageBoardData = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        const token = data.token
        const messageBoardData = getDataFromToken(token)
        if (!messageBoardData)
            return res.json({success: false, alertMessage: 'Invalid token'})
        const user = messageBoardData.user
        const messageBoardId = messageBoardData.messageBoardId
        await connectToDb()
        const messageBoardData2 = await MessageBoard.findById(messageBoardId)
        if (!messageBoardData2)
            return res.json({success: false, alertMessage: 'Message board not found'})
        const messages = messageBoardData2.messages
        const listingDetails = messageBoardData2.listingDetails
        const useEscrow = listingDetails.useEscrow
        delete listingDetails.sellerEosAccountName
        delete listingDetails.buyerEosAccountName
        delete listingDetails.buyerMemo
        delete listingDetails.sellerMemo
        const messageBoardData3 = {
            user: user,
            messages: messages,
            listingDetails: listingDetails,
            escrowDetails: {}
        }
        if (useEscrow) {
            const escrowData = await Escrow.findOne({messageBoardId: messageBoardId})
            const escrowId = escrowData._id
            const disputeData = await Dispute.findOne({escrowId: escrowId})
            if (escrowData) {
                const escrowReleased = escrowData.escrowReleased
                const escrowRefunded = escrowData.escrowRefunded
                const disputeOpened = escrowData.disputeOpened
                const escrowReleasedOnTimestamp = escrowData.escrowReleasedOnTimestamp
                const escrowRefundedOnTimestamp = escrowData.escrowRefundedOnTimestamp
                const disputeOpenedOnTimestamp = escrowData.disputeOpenedOnTimestamp
                let disputeResolved = false
                let disputeResolvedOnTimestamp = null
                if (disputeData) {
                    disputeResolved = disputeData.resolved
                    disputeResolvedOnTimestamp = disputeData.resolvedOnTimestamp
                }
                messageBoardData3.escrowDetails = {
                    escrowReleased: escrowReleased,
                    escrowRefunded: escrowRefunded,
                    disputeOpened: disputeOpened,
                    disputeResolved: disputeResolved,
                    disputeResolvedOnTimestamp: disputeResolvedOnTimestamp,
                    escrowReleasedOnTimestamp: escrowReleasedOnTimestamp,
                    escrowRefundedOnTimestamp: escrowRefundedOnTimestamp,
                    disputeOpenedOnTimestamp: disputeOpenedOnTimestamp,
                }
            }
        }
        return res.json({success: true, messageBoardData: messageBoardData3})
    } else
        return res.json({success: false})
}

export default getMessageBoardData