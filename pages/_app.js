import '../styles/globals.css'
import {createTheme} from '@material-ui/core/styles'
import {deepPurple, red} from "@material-ui/core/colors";
import {AppContext} from "../contexts/AppContext";
import React, {useState} from "react"
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import LayoutComponent from "../components/LayoutComponent";

const theme = createTheme({
    palette: {
        primary: {main: red[500]},
        secondary: {main: deepPurple[500]},
        type: 'dark'
    }
})

function MyApp({Component, pageProps}) {
    const [description, setDescription] = React.useState('')
    const [descriptionError, setDescriptionError] = React.useState(false)
    const [quantity, setQuantity] = React.useState(1)
    const [saleMethod, setSaleMethod] = React.useState('askingPriceOnly')
    const [fixedAmount, setFixedAmount] = React.useState('usd')
    const [usdAmount, setUsdAmount] = React.useState('')
    const [usdAmountError, setUsdAmountError] = React.useState(false)
    const [eosAmount, setEosAmount] = React.useState('')
    const [eosAmountError, setEosAmountError] = React.useState(false)
    const [maximumPercentLessThan, setMaximumPercentLessThan] =
        React.useState(25)
    const [eosAccountName, setEosAccountName] = React.useState('')
    const [eosAccountNameError, setEosAccountNameError] = React.useState(false)
    const [addMemo, setAddMemo] = React.useState(false)
    const [memo, setMemo] = React.useState('')
    const [memoError, setMemoError] = React.useState(false)
    const [emailAddress, setEmailAddress] = React.useState('')
    const [emailAddressError, setEmailAddressError] = React.useState(false)
    const [eosRate, setEosRate] = React.useState(null)
    const [recaptchaRef, setRecaptchaRef] = React.useState(React.createRef())
    const [link, setLink] = React.useState('')
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const [snackbarMessage, setSnackbarMessage] = React.useState('')
    const [hidden, setHidden] = React.useState(false)
    const [associativePrivateKey, setAssociativePrivateKey] = React.useState('')
    const [associativePrivateKeyError, setAssociativePrivateKeyError] =
        React.useState(false)
    const [comments, setComments] = React.useState('')
    const [recaptchaResponse, setRecaptchaResponse] = React.useState(null)
    const [offer, setOffer] = React.useState(false)
    const [usdAmountLabel, setUsdAmountLabel] = React.useState('')
    const [eosAmountLabel, setEosAmountLabel] = React.useState('')
    const [usdAmountValue, setUsdAmountValue] = React.useState('')
    const [eosAmountValue, setEosAmountValue] = React.useState('')
    const [submittingData, setSubmittingData] = React.useState(false)
    const [minimumQuantity, setMinimumQuantity] = React.useState(1)
    const [code, setCode] = React.useState('')
    const pageTimestamp = Date.now()
    const [offers, setOffers] = React.useState([])
    const [message, setMessage] = React.useState('')
    const [messageError, setMessageError] = React.useState(false)
    const [messages, setMessages] = React.useState([])
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [dialogHasTitle, setDialogHasTitle] = React.useState(false)
    const [dialogTitle, setDialogTitle] = React.useState('')
    const [dialogText, setDialogText] = React.useState('')
    const [sliderKey, setSliderKey] = React.useState(1)
    const [linkCode, setLinkCode] = React.useState('')
    const [defaultQuantity, setDefaultQuantity] = React.useState(1)
    const [eosAccount, setEosAccount] = React.useState('New')
    const [eosAccountItems, setEosAccountItems] = React.useState([])
    const [showOffers, setShowOffers] = React.useState(false)
    const [escrowDetails, setEscrowDetails] = React.useState({})
    const [publicListing, setPublicListing] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [keywords, setKeywords] = React.useState([])
    const [titleError, setTitleError] = React.useState(false)
    const [search, setSearch] = useState('')
    const [mode, setMode] = useState(null)
    const [modeError, setModeError] = useState(false)
    const [platforms, setPlatforms] = useState([])
    const [platformsError, setPlatformsError] = useState(false)
    const [category, setCategory] = useState(null)
    const [categoryError, setCategoryError] = useState(false)
    const [subcategory, setSubcategory] = useState(null)
    const [subcategoryError, setSubcategoryError] = useState(false)
    const [imageLink, setImageLink] = useState('')
    const [subcategoryDisabled, setSubcategoryDisabled] = useState(true)
    const [minAmount, setMinAmount] = useState(true)
    const [modes, setModes] = useState([])
    const [platforms2, setPlatforms2] = useState([])
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
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
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles)
            jssStyles.parentElement.removeChild(jssStyles);
    }, []);
    return (
        <AppContext.Provider
            value={{
                mode,
                setMode,
                modeError,
                setModeError,
                platforms,
                setPlatforms,
                platformsError,
                setPlatformsError,
                category,
                setCategory,
                categoryError,
                setCategoryError,
                subcategory,
                setSubcategory,
                subcategoryError,
                setSubcategoryError,
                imageLink,
                setImageLink,
                subcategoryDisabled,
                setSubcategoryDisabled,
                minAmount,
                setMinAmount,
                modes,
                setModes,
                platforms2,
                setPlatforms2,
                categories,
                setCategories,
                subcategories,
                setSubcategories,
                search,
                setSearch,
                titleError,
                setTitleError,
                keywords,
                setKeywords,
                title,
                setTitle,
                publicListing,
                setPublicListing,
                dialogOpen,
                setDialogOpen,
                dialogHasTitle,
                setDialogHasTitle,
                dialogTitle,
                setDialogTitle,
                dialogText,
                setDialogText,
                description,
                setDescription,
                descriptionError,
                setDescriptionError,
                quantity,
                setQuantity,
                saleMethod,
                setSaleMethod,
                fixedAmount,
                setFixedAmount,
                usdAmount,
                setUsdAmount,
                usdAmountError,
                setUsdAmountError,
                eosAmount,
                setEosAmount,
                eosAmountError,
                setEosAmountError,
                maximumPercentLessThan,
                setMaximumPercentLessThan,
                eosAccountName,
                setEosAccountName,
                eosAccountNameError,
                setEosAccountNameError,
                addMemo,
                setAddMemo,
                memo,
                setMemo,
                memoError,
                setMemoError,
                emailAddress,
                setEmailAddress,
                emailAddressError,
                setEmailAddressError,
                eosRate,
                setEosRate,
                recaptchaRef,
                setRecaptchaRef,
                link,
                setLink,
                snackbarOpen,
                setSnackbarOpen,
                snackbarMessage,
                setSnackbarMessage,
                hidden,
                setHidden,
                associativePrivateKey,
                setAssociativePrivateKey,
                associativePrivateKeyError,
                setAssociativePrivateKeyError,
                comments,
                setComments,
                recaptchaResponse,
                setRecaptchaResponse,
                offer,
                setOffer,
                usdAmountLabel,
                setUsdAmountLabel,
                eosAmountLabel,
                setEosAmountLabel,
                eosAmountValue,
                setEosAmountValue,
                usdAmountValue,
                setUsdAmountValue,
                submittingData,
                setSubmittingData,
                minimumQuantity,
                setMinimumQuantity,
                code,
                setCode,
                pageTimestamp,
                offers,
                setOffers,
                message,
                setMessage,
                messageError,
                setMessageError,
                messages,
                setMessages,
                sliderKey,
                setSliderKey,
                linkCode,
                setLinkCode,
                defaultQuantity,
                setDefaultQuantity,
                eosAccount,
                setEosAccount,
                eosAccountItems,
                setEosAccountItems,
                showOffers,
                setShowOffers,
                escrowDetails,
                setEscrowDetails,
                categoryAndSubcategoryOptions
            }}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <LayoutComponent>
                    <Component {...pageProps} />
                </LayoutComponent>
            </ThemeProvider>
        </AppContext.Provider>
    )
}

export default MyApp
