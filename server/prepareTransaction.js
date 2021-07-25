import Listing from '../models/Listing'
import {updatePending} from './updatePending'

export async function prepareTransaction(listingId) {
    const listing = await Listing.findOne(
        {_id: listingId},
        {quantity: 1, quantitySold: 1, pending: 1}
    )
    const quantity = listing.quantity
    const quantitySold = listing.quantitySold
    const pending = listing.pending
    const quantityAvailable = quantity - quantitySold
    if (quantityAvailable === 0)
        return {success: false, alertMessage: 'Quantity not available'}
    if (pending === quantityAvailable)
        return {success: false, alertMessage: 'Pending transaction'}
    await updatePending(listingId)
    return {success: true}
}
