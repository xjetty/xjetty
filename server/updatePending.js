import Listing from '../models/Listing'

export async function updatePending(listingId, add = true) {
    const listing = await Listing.findOne({_id: listingId}, {pending: 1})
    const pending = listing.pending
    if (add) {
        await Listing.updateOne({_id: listingId}, {$set: {pending: pending + 1}})
    } else await Listing.updateOne({_id: listingId}, {$set: {pending: pending - 1}})
}
