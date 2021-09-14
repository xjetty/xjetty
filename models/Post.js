import {verifyEosAccountName} from '../server/verifyEosAccountName'
import emailValidator from 'email-validator'

const ip = require('ip')

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

const categoryOptions = categoryAndSubcategoryOptions.map(x => x.category)

const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    mode: {
        type: String,
        required: true,
        enum: [
            'Standard',
            // 'Standard Ladder',
            'Hardcore',
            // 'Hardcore Ladder',
            'Standard Expansion',
            // 'Standard Expansion Ladder',
            'Hardcore Expansion',
            // 'Hardcore Expansion Ladder'
        ]
    },
    platforms: {
        type: Array,
        required: true,
        validator: function (value) {
            let error = false
            const platformValues = [
                'PC',
                'PlayStation',
                'Xbox',
                'Nintendo'
            ]
            value.forEach(function (value) {
                if (!platformValues.includes(value))
                    error = true
            })
            return error
        },
    },
    category: {
        type: String,
        required: true,
        enum: categoryOptions
    },
    subcategory: {
        type: String,
    },
    code: {
        type: String,
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    },
    pendingTransactions: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    imageLink: {
        type: String
    },
    description: {
        type: String,
        trim: true
    },
    keywords: {
        type: Array
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    quantitySold: {
        type: Number,
        default: 0
    },
    saleMethod: {
        type: String,
        required: true,
        enum: ['askingPriceOnly', 'askingPriceAndOffers', 'offersOnly']
    },
    fixedAmount: {
        type: String,
        required: true,
        enum: ['usd', 'eos']
    },
    usdAmount: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0
            }
        }
    },
    eosAmount: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0
            }
        }
    },
    maximumPercentLessThan: {
        type: Number,
        default: null,
        required: function () {
            return this.saleMethod === 'askingPriceAndOffers'
        },
        min: 1,
        max: 99
    },
    eosAccountName: {
        type: String,
        validate: {
            validator: async function (value) {
                return await verifyEosAccountName(value)
            }
        },
        maxlength: 12,
        minlength: 12
    },
    addMemo: {
        type: Boolean,
        required: true
    },
    memo: {
        type: String,
        trim: true
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                return emailValidator.validate(value)
            }
        }
    },
    ipAddress: {
        type: String,
        default: ip.address()
    },
    createdOnTimestamp: {
        type: Number,
        default: Date.now()
    },
    lastUpdatedOnTimestamp: {
        type: Number,
        default: Date.now()
    }
})

module.exports =
    mongoose.models.Post || mongoose.model('Post', PostSchema)
