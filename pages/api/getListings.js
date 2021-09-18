import connectToDb from "../../middleware/connectToDb";
import cookie from 'cookie'
import Listing from '../../models/Listing'

const getListings = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        await connectToDb()
        const applied = data.applied
        let search = data.search
        let worldwide = data.worldwide
        let countries = data.countries
        search = search.trim().toLowerCase()
        search = search.replace(/\s\s+/g, ' ')
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
        let listings = []
        let searchArray = search.split(' ')
        let searchArrayFilter = searchArray.map(function (value) {
            return `/${value}/`
        })
        const searchArrayFilterRegex = []
        searchArrayFilter.forEach(function name(value) {
            const newValue = value.replace(/\//ig, '')
            searchArrayFilterRegex.push(new RegExp(newValue))
        })
        let filter = {
            publicListing: true,
            hidden: false,
            worldwide: worldwide
        }
        if (!worldwide) {
            if (countries.length === 0)
                return res.json({success: false})
            filter.countries = {$in: countries}
        }
        if (search) {
            filter.$or = [{title: {'$regex': search, '$options': 'i'}},
                {description: {'$regex': search, '$options': 'i'}},
                {keywords: {$in: searchArrayFilterRegex}}]
        }
        listings = await Listing.find(filter)
        listings.filter(function (post) {
            const quantity = post.quantity
            const quantitySold = post.quantitySold
            const pendingTransactions = post.pendingTransactions
            return ((quantitySold + pendingTransactions) < quantity)
        })
        listings = listings.reverse()
        listings = listings.map(function (value) {
            let imageLink = null
            if (value.imageLinks.length > 0)
                imageLink = value.imageLinks[0]
            return {
                imageLink: imageLink,
                title: value.title,
                createdOnTimestamp: value.createdOnTimestamp,
                fixedAmount: value.fixedAmount,
                usdAmount: value.usdAmount,
                eosAmount: value.eosAmount,
                saleMethod: value.saleMethod,
                code: value.code
            }
        })
        const pageLength = Math.ceil(listings.length / 64)
        listings = listings.slice((page - 1) * 64, 64)
        return res.json({success: true, listings: listings, pageLength: pageLength})
    } else
        return res.json({success: false})
}

export default getListings