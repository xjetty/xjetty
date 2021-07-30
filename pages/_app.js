import '../styles/globals.css'
import {createTheme} from '@material-ui/core/styles'
import {blue, red} from "@material-ui/core/colors";
import {AppContext} from "../contexts/AppContext";
import React from "react"
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import LayoutComponent from "../components/LayoutComponent";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: red
    }
})

function MyApp({Component, pageProps}) {
    const [notes, setNotes] = React.useState('')
    const [notesError, setNotesError] = React.useState(false)
    const [quantity, setQuantity] = React.useState(1)
    const [saleMethod, setSaleMethod] = React.useState('askingPriceOnly')
    const [fixedAmount, setFixedAmount] = React.useState('usd')
    const [usdAmount, setUsdAmount] = React.useState('')
    const [usdAmountError, setUsdAmountError] = React.useState(false)
    const [eosAmount, setEosAmount] = React.useState('')
    const [eosAmountError, setEosAmountError] = React.useState(false)
    const [maximumPercentLessThan, setMaximumPercentLessThan] =
        React.useState(25)
    const [useEscrow, setUseEscrow] = React.useState(false)
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
    const [token, setToken] = React.useState('')
    const [hidden, setHidden] = React.useState(false)
    const [generateNewLinkBtnDisabled, setGenerateNewLinkBtnDisabled] =
        React.useState(false)
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
    const [showListing, setShowListing] = React.useState(false)
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
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles)
            jssStyles.parentElement.removeChild(jssStyles);
    }, []);
    return (
        <AppContext.Provider
            value={{
                dialogOpen,
                setDialogOpen,
                dialogHasTitle,
                setDialogHasTitle,
                dialogTitle,
                setDialogTitle,
                dialogText,
                setDialogText,
                notes,
                setNotes,
                notesError,
                setNotesError,
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
                useEscrow,
                setUseEscrow,
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
                token,
                setToken,
                hidden,
                setHidden,
                generateNewLinkBtnDisabled,
                setGenerateNewLinkBtnDisabled,
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
                showListing,
                setShowListing,
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
