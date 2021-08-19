import {FormControlLabel, Switch} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const PublicListingFieldComponent = () => {
    const {publicListing, setPublicListing} = useContext(AppContext)

    const handle = (event) => {
        setPublicListing(event.target.checked)
    }

    return (
        <FormControlLabel
            control={<Switch checked={publicListing} onChange={handle} />}
            label="Public listing"
        />
    )
}

export default PublicListingFieldComponent
