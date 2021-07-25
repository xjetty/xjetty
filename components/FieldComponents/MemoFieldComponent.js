import {useContext, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {TextField} from '@material-ui/core'

const MemoFieldComponent = () => {
    const {memo, setMemo, memoError, setMemoError} = useContext(AppContext)

    const handle = (event) => {
        const value = event.target.value
        const valueTrim = value.trim()
        if (!valueTrim) {
            setMemoError(true)
        } else setMemoError(false)
        setMemo(value)
    }

    const checkError = () => {
        const valueTrim = memo.trim()
        if (!valueTrim) {
            setMemoError(true)
        } else setMemoError(false)
    }

    const helperText = useMemo(() => {
        if (memoError) {
            return 'Memo is required'
        } else return ''
    }, [memoError])

    return (
        <TextField
            error={memoError}
            onBlur={checkError}
            helperText={helperText}
            value={memo}
            onChange={handle}
            fullWidth
            label="Memo"
            multiline
            variant="filled"
        />
    )
}

export default MemoFieldComponent
