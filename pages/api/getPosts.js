import connectToDb from "../../middleware/connectToDb";
import cookie from 'cookie'
import Post from '../../models/Post'

const getPosts = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        await connectToDb()
        const applied = data.applied

        let modes = data.modes
        let platforms = data.platforms
        let categories = data.categories
        let subcategories = data.subcategories
        let search = data.search
        search = search.trim().toLowerCase()
        search = search.replace(/\s\s+/g, ' ')
        const page = data.page
        if (applied) {
            res.setHeader('Set-Cookie', cookie.serialize('modes', modes, {
                httpOnly: true,
            }))
            res.setHeader('Set-Cookie', cookie.serialize('platforms', platforms, {
                httpOnly: true,
            }))
            res.setHeader('Set-Cookie', cookie.serialize('categories', categories, {
                httpOnly: true,
            }))
            res.setHeader('Set-Cookie', cookie.serialize('subcategories', subcategories, {
                httpOnly: true,
            }))
            res.setHeader('Set-Cookie', cookie.serialize('search', search, {
                httpOnly: true,
            }))
        } else {
            modes = cookie.parse(req.headers.modes)
            platforms = cookie.parse(req.headers.platforms)
            categories = cookie.parse(req.headers.categories)
            subcategories = cookie.parse(req.headers.subcategories)
            search = cookie.parse(req.headers.search)
        }
        let posts = []
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
            hidden: false,
            code: {$ne: null}
        }
        if (modes.length > 0) {
            filter.mode = {$in: modes}
        }
        if (platforms.length > 0) {
            filter.platforms = {$elemMatch: {$in: platforms}}
        }
        if (categories.length > 0) {
            filter.categories = {$in: categories}
        }
        if (subcategories.length > 0) {
            filter.subcategories = {$in: subcategories}
        }
        if (search) {
            filter.$or = [{title: {'$regex': search, '$options': 'i'}},
                {description: {'$regex': search, '$options': 'i'}},
                {keywords: {$in: searchArrayFilterRegex}}]
        }
        posts = await Post.find(filter)

        posts.filter(function (post) {
            const quantity = post.quantity
            const quantitySold = post.quantitySold
            const pendingTransactions = post.pendingTransactions
            return ((quantitySold + pendingTransactions) < quantity)
        })

        const pageLength = Math.ceil(posts.length / 64)
        posts = posts.slice((page - 1) * 64, 64)
        return res.json({success: true, posts: posts, pageLength: pageLength})
    } else
        return res.json({success: false})
}

export default getPosts