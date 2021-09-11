import React, {useContext, useEffect, useMemo, useState} from 'react'
import {AppContext} from "../../contexts/AppContext"
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";

const SubcategoryFieldComponent = () => {
    const {
        category,
        categoryError,
        subcategory,
        setSubcategory,
        subcategoryError,
        setSubcategoryError,
        subcategoryDisabled,
        setSubcategoryDisabled
    } = useContext(AppContext)

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

    const subcategoryOptions = useMemo(() => {
        if (category && !categoryError) {
            return categoryAndSubcategoryOptions.find(x => x.category === category).subcategories
        } else
            return []
    }, [category, categoryError])

    const handleChange = (event, value) => {
        if (value) {
            setSubcategoryError(false)
        } else
            setSubcategoryError(true)
        setSubcategory(value)
    }

    const checkError = (event, reason) => {
        if (reason === 'blur') {
            if (subcategory) {
                setSubcategoryError(false)
            } else
                setSubcategoryError(true)
        }
    }

    const helperText = useMemo(() => {
        if (subcategoryError) {
            return 'Subcategory is required'
        } else return ''
    }, [subcategoryError])

    const disabled = useMemo(() => {
        if (subcategoryOptions.length > 0) {
            if (!category || categoryError) {
                return true
            } else
                return false
        } else
            return true
    }, [category, categoryError, subcategoryOptions])

    useEffect(() => {
        setSubcategoryDisabled(disabled)
    }, [disabled])

    return (
        <Autocomplete
            key={disabled}
            value={subcategory}
            disabled={disabled}
            openOnFocus
            onClose={checkError}
            onChange={handleChange}
            options={subcategoryOptions}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    required={!disabled}
                    {...params}
                    error={subcategoryError}
                    helperText={helperText}
                    variant="filled"
                    label="Subcategory"
                />
            )}
        />
    )
}

export default SubcategoryFieldComponent