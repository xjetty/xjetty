import React, {useMemo, useContext} from 'react'
import {TextField} from '@material-ui/core'
import {AppContext} from '../../contexts/AppContext'

const NotesFieldComponent = () => {
    const {notes, setNotes, notesError, setNotesError} = useContext(AppContext)

    const helperText = useMemo(() => {
        if (notesError) {
            return 'Notes is required'
        } else return ''
    }, [notesError])

    const handle = (event) => {
        const value = event.target.value
        const valueTrim = value.trim()
        if (!valueTrim) {
            setNotesError(true)
        } else setNotesError(false)
        setNotes(value)
    }

    const checkError = () => {
        const valueTrim = notes.trim()
        if (!valueTrim) {
            setNotesError(true)
        } else setNotesError(false)
    }

    return (
        <TextField
            error={notesError}
            value={notes}
            onChange={handle}
            onBlur={checkError}
            fullWidth
            label="Notes"
            multiline
            variant="filled"
            helperText={helperText}
        />
    )
}

export default NotesFieldComponent
