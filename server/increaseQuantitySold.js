import Listing from '../models/Listing'

export async function increaseQuantitySold(listingId, quantity) {
    const listing = await Listing.findOne({_id: listingId}, {quantitySold: 1})
    const quantitySold = listing.quantitySold
    await Listing.updateOne(
        {_id: listingId},
        {$set: {quantitySold: quantitySold + quantity}}
    )
}
