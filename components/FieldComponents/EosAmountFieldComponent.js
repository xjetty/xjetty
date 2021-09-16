import NumberFormat from 'react-number-format'
import {Avatar, InputAdornment, TextField} from '@material-ui/core'
import React, {useContext, useEffect, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'

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
            allowNegative={false}
            decimalScale={4}
        />
    )
}

const EosAmountFieldComponent = () => {
    const {
        eosAmount,
        setEosAmount,
        eosAmountError,
        setEosAmountError,
        fixedAmount,
        setUsdAmount,
        saleMethod,
        eosRate,
        eosAmountValue,
        minAmount,
    } = useContext(AppContext)

    const handle = (event) => {
        const value = event.target.value
        const valueFloat = parseFloat(value)
        if (fixedAmount === 'eos') {
            if (!value) {
                setEosAmountError(true)
            } else if (valueFloat <= 0) {
                setEosAmountError(true)
            } else if (saleMethod === 'askingPriceAndOffers' && fixedAmount === 'eos' && eosAmountValue && valueFloat >= eosAmountValue) {
                setEosAmountError(true)
            } else
                setEosAmountError(false)
        }
        setEosAmount(value)
        if (fixedAmount === 'eos') {
            if (value) {
                setUsdAmount((valueFloat * eosRate))
            } else
                setUsdAmount('')
        }
    }

    const helperText = useMemo(() => {
        if (eosAmountError && fixedAmount === 'eos') {
            if (!eosAmount) {
                if (saleMethod === 'offersOnly') {
                    return 'Minimum EOS amount is required'
                } else return 'EOS amount is required'
            } else {
                if (saleMethod === 'offersOnly') {
                    return 'Minimum EOS amount must be valid'
                } else return 'EOS amount must be valid'
            }
        } else return ''
    }, [eosAmountError, saleMethod, eosAmount])

    const checkError = () => {
        if (!eosAmount && fixedAmount === 'eos')
            setEosAmountError(true)
    }

    useEffect(() => {
        if (fixedAmount === 'eos') {
            if (eosAmount) {
                const valueFloat = parseFloat(eosAmount)
                setUsdAmount((valueFloat * eosRate))
            } else setUsdAmount('')
        }
    }, [eosRate])

    return (
        <TextField
            InputLabelProps={{required: fixedAmount === 'eos'}}
            error={eosAmountError}
            helperText={helperText}
            onBlur={checkError}
            fullWidth
            label={
                (saleMethod === 'offersOnly' && minAmount)
                    ? 'Minimum EOS amount'
                    : 'EOS amount'
            }
            InputProps={{
                inputComponent: formatAmount, endAdornment: (
                    <InputAdornment position="end">
                        <Avatar alt="EOS Logo" imgProps={{style: {objectFit: "initial"}}} src="/eos-logo.svg"/>
                    </InputAdornment>
                ), readOnly: fixedAmount !== 'eos'
            }}
            value={eosAmount}
            onChange={handle}
            variant="filled"
        />
    )
}

export default EosAmountFieldComponent
