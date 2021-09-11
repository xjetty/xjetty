import {getIdFromToken} from "../../server/getIdFromToken";
import Post from "../../models/Post";
import connectToDb from "../../middleware/connectToDb";
import {cleanString} from "../../server/cleanString";

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

const updatePost = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        delete data.token
        data.description = cleanString(data.description)
        data.keywords = data.keywords.map(function (keyword) {
            return keyword.toLowerCase()
        })
        data.lastUpdatedTimestamp = Date.now()
        const postId = getIdFromToken(token, 'postId')
        if (!postId)
            return res.json({success: false})
        if (!data.category)
            return res.json({success: false})
        const subcategories = categoryAndSubcategoryOptions.find(x => x.category === data.category).subcategories
        if (subcategories.length > 0) {
            if (!subcategories.includes(data.subcategory))
                return res.json({success: false})
        }
        await connectToDb()
        await Post.updateOne({_id: postId}, {$set: data})
        return res.json({success: true})
    } else
        return res.json({success: false})
}

export default updatePost