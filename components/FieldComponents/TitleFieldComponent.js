import {TextField} from '@material-ui/core'
import {useContext, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'

const TitleFieldComponent = () => {
    const {title, setTitle, titleError, setTitleError} = useContext(AppContext)

    const helperText = useMemo(() => {
        if (titleError) {
            return 'Title is required'
        } else return ''
    }, [titleError])

    const handle = (event) => {
        const value = event.target.value
        const valueTrim = value.trim()
        if (!valueTrim) {
            setTitleError(true)
        } else setTitleError(false)
        setTitle(value)
    }

    const checkError = () => {
        const valueTrim = title.trim()
        if (!valueTrim) {
            setTitleError(true)
        } else setTitleError(false)
    }

    return (
        <TextField
            InputLabelProps={{required: true}}
            error={titleError}
            value={title}
            onChange={handle}
            onBlur={checkError}
            fullWidth
            label="Title"
            variant="outlined"
            helperText={helperText}
        />
    )
}

export default TitleFieldComponent
