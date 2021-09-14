import {useContext, useEffect, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {TextField} from '@material-ui/core'
import NumberFormat from 'react-number-format'

const formatAmount = (props) => {
    const {inputRef, onChange, ...other} = props

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                })
            }}
            thousandSeparator
            isNumericString
            prefix="$"
            allowNegative={false}
            decimalScale={2}
        />
    )
}

const UsdAmountFieldComponent = () => {
    const {
        usdAmount,
        setUsdAmount,
        usdAmountError,
        setUsdAmountError,
        fixedAmount,
        setEosAmount,
        saleMethod,
        eosRate,
        usdAmountValue,
        minAmount,
    } = useContext(AppContext)

    const handle = (event) => {
        const value = event.target.value
        const valueFloat = parseFloat(value)
        if (fixedAmount === 'usd') {
            if (!value) {
                setUsdAmountError(true)
            } else if (valueFloat <= 0) {
                setUsdAmountError(true)
            } else if (saleMethod === 'askingPriceAndOffers' && fixedAmount === 'usd' && usdAmountValue && valueFloat >= usdAmountValue) {
                setUsdAmountError(true)
            } else
                setUsdAmountError(false)
        }
        setUsdAmount(value)
        if (fixedAmount === 'usd') {
            if (value) {
                setEosAmount((valueFloat / eosRate))
            } else
                setEosAmount('')
        }
    }

    const helperText = useMemo(() => {
        if (usdAmountError && fixedAmount === 'usd') {
            if (!usdAmount) {
                if (saleMethod === 'offersOnly') {
                    return 'Minimum USD amount is required'
                } else
                    return 'USD amount is required'
            } else {
                if (saleMethod === 'offersOnly') {
                    return 'Minimum USD amount must be valid'
                } else
                    return 'USD amount must be valid'
            }
        } else return ''
    }, [usdAmountError, saleMethod, usdAmount])

    const checkError = () => {
        if (!usdAmount && fixedAmount === 'usd')
            setUsdAmountError(true)
    }

    useEffect(() => {
        if (fixedAmount === 'usd') {
            if (usdAmount) {
                const valueFloat = parseFloat(usdAmount)
                setEosAmount((valueFloat / eosRate))
            } else setEosAmount('')
        }
    }, [eosRate])

    return (
        <TextField
            InputLabelProps={{required: fixedAmount === 'usd'}}
            error={usdAmountError}
            helperText={helperText}
            onBlur={checkError}
            fullWidth
            label={
                (saleMethod === 'offersOnly' && minAmount)
                    ? 'Minimum USD amount'
                    : 'USD amount'
            }
            InputProps={{inputComponent: formatAmount, readOnly: fixedAmount === 'eos'}}
            value={usdAmount}
            onChange={handle}
            variant="outlined"
        />
    )
}

export default UsdAmountFieldComponent
