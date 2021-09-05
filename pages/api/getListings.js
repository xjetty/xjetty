import {verifyRecaptcha} from '../../server/verifyRecaptcha'
import connectToDb from "../../middleware/connectToDb";
import cookie from 'cookie'
import Listing from '../../models/Listing'

const getListings = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaVerified = await verifyRecaptcha(recaptchaResponse)
        if (!recaptchaVerified) return res.json({success: false})
        await connectToDb()
        const applied = data.applied
        let search = data.search
        let worldwide = data.worldwide
        let countries = data.countries
        const page = data.page
        if (applied) {
            res.setHeader('Set-Cookie', cookie.serialize('search', search, {
                httpOnly: true,
            }))
            res.setHeader('Set-Cookie', cookie.serialize('worldwide', worldwide, {
                httpOnly: true,
            }))
            res.setHeader('Set-Cookie', cookie.serialize('countries', countries, {
                httpOnly: true,
            }))
        } else {
            search = cookie.parse(req.headers.search)
            worldwide = cookie.parse(req.headers.worldwide)
            countries = cookie.parse(req.headers.countries)
        }
        const listingsPerPage = 64
        let listings = []
        if (worldwide) {
            if (search.trim()) {
                listings = await Listing.find({
                    hidden: false,
                    code: {$ne: null},
                    publicListing: true,
                    worldwide: true,
                    $or: [{title: {'$regex': search, '$options': 'i'}},
                        {description: {'$regex': search, '$options': 'i'}},
                        {keywords: {'$regex': search, '$options': 'i'}}]
                }).skip().limit(listingsPerPage)
            } else {
                listings = await Listing.find({
                    hidden: false,
                    code: {$ne: null},
                    publicListing: true,
                    worldwide: true
                }).skip().limit(listingsPerPage)
            }
        } else {
            if (search.trim()) {
                listings = await Listing.find({
                    hidden: false,
                    code: {$ne: null},
                    publicListing: true,
                    countries: {$in: countries},
                    $or: [{title: {'$regex': search, '$options': 'i'}},
                        {description: {'$regex': search, '$options': 'i'}},
                        {keywords: {'$regex': search, '$options': 'i'}}]
                }).skip().limit(listingsPerPage)
            } else {
                listings = await Listing.find({
                    hidden: false,
                    code: {$ne: null},
                    publicListing: true,
                    countries: {$in: countries}
                }).skip().limit(listingsPerPage)
            }
        }

        listings.filter(function (listing) {
            const quantity = listing.quantity
            const quantitySold = listing.quantitySold
            const pendingTransactions = listing.pendingTransactions
            return ((quantitySold + pendingTransactions) < quantity)
        })

        const pageLength = Math.ceil(listings.length / 64)
        listings = listings.slice((page - 1) * 64, 64)
        return res.json({success: true, listings: listings, pageLength: pageLength})
    } else
        return res.json({success: false})
}

export default getListings