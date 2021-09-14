import Post from '../../models/Post'
import jwt from 'jsonwebtoken'
import {verifyRecaptcha} from '../../server/verifyRecaptcha'
import {sendEmail} from '../../server/sendEmail'
import connectToDb from "../../middleware/connectToDb";
import {cleanString} from "../../server/cleanString";
import {getPostPreview} from "../../server/getPostPreview";
import {getLocalhost} from "../../server/getLocalhost";
import {generateCode} from "../../server/generateCode";

const categoryAndSubcategoryOptions = [
    {category: 'Amulets', subcategories: ['Magic', 'Rare', 'Unique']},
    {category: 'Belts', subcategories: ['Rare', 'Unique']},
    {category: 'Body Armor', subcategories: ['Magic', 'Rare', 'Unique']},
    {category: 'Boots', subcategories: ['Rare', 'Unique']},
    {
        category: 'Grand Charms',
        subcategories: ['Magic', 'Amazon Skills', 'Assassin Skills', 'Barbarian Skills', 'Druid Skills', 'Necromancer Skills', 'Paladin Skills', 'Sorcerer Skills', 'Gheed\'s Fortune']
    },
    {
        category: 'Large Charms',
        subcategories: ['Magic', 'Amazon Hellfire Torch', 'Assassin Hellfire Torch', 'Barbarian Hellfire Torch', 'Druid Hellfire Torch', 'Necromancer Hellfire Torch', 'Paladin Hellfire Torch', 'Sorcerer Hellfire Torch']
    },
    {category: 'Small Charms', subcategories: ['Magic', 'Annihilus']},
    {category: 'Gems', subcategories: []},
    {category: 'Gloves', subcategories: ['Magic', 'Rare', 'Unique']},
    {category: 'Helms', subcategories: ['Magic', 'Rare', 'Unique']},
    {category: 'Jewels', subcategories: ['Magic', 'Rare', 'Unique']},
    {category: 'Rings', subcategories: ['Magic', 'Rare', 'Unique']},
    {
        category: 'Runes',
        subcategories: ['Amn', 'Sol', 'Shael', 'Dol', 'Hel', 'Io', 'Lum', 'Ko', 'Fal', 'Lem', 'Pul', 'Um', 'Mal', 'Ist', 'Gul', 'Vex', 'Ohm', 'Lo', 'Sur', 'Ber', 'Jah', 'Cham', 'Zod']
    },
    {
        category: 'Runewords',
        subcategories: ['Beast', 'Bramble', 'Breath of the Dying', 'Call to Arms', 'Chains of Honor', 'Death', 'Destruction', 'Doom', 'Dragon', 'Dream', 'Duress', 'Enigma', 'Exile', 'Faith', 'Fortitude', 'Grief', 'Hand of Justice', 'Heart of the Oak', 'Infinity', 'Insight', 'Last Wish', 'Phoenix', 'Pride', 'Spirit']
    },
    {category: 'Set Items', subcategories: []},
    {category: 'Socketed Items', subcategories: []},
    {category: 'Shields', subcategories: ['Magic', 'Rare', 'Unique']},
    {category: 'Essences and Tokens', subcategories: []},
    {category: 'Weapons', subcategories: ['Magic', 'Rare', 'Unique']},
    {category: 'Miscellaneous', subcategories: []},
    {category: 'Services', subcategories: []}
]

const createPost = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = await verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        delete data.recaptchaResponse
        data.description = cleanString(data.description)
        data.keywords = data.keywords.map(function (keyword) {
            return keyword.toLowerCase()
        })
        if (!data.category)
            return res.json({success: false})
        const subcategories = categoryAndSubcategoryOptions.find(x => x.category === data.category).subcategories
        if (subcategories.length > 0) {
            if (!subcategories.includes(data.subcategory))
                return res.json({success: false})
        }
        await connectToDb()
        try {
            data.code = await generateCode()
            const post = await Post.create(data)
            const postId = post._id
            const mode = post.mode
            const platforms = post.platforms
            const category = post.category
            const subcategory = post.subcategory
            const title = post.title
            const description = post.description
            const keywords = post.keywords
            const emailAddress = post.emailAddress
            const postPreview = getPostPreview(mode, platforms, category, subcategory, title, description, keywords)
            const payload = {postId: postId}
            const token = jwt.sign(payload, process.env.JWT_SIGNATURE)
            let link = `https://blockcommerc.com/manager/${token}`
            if (getLocalhost())
                link = `http://localhost:3010/manager/${token}`
            const subject = `You created a post! - ${title}`
            const message = `You can view your post by visiting your manager.<br /><br /><a href=${link}>${link}</a><br /><br />${postPreview}`
            await sendEmail(emailAddress, subject, message)
            return res.json({success: true})
        } catch (e) {
            return res.json({success: false})
        }
    } else
        return res.json({success: false})
}

export default createPost