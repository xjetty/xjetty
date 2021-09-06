import React, {useContext, useEffect, useMemo} from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {AppContext} from "../../contexts/AppContext"
import {FormHelperText, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";

const countryItems = [
    'Argentina',
    'Algeria',
    'Afghanistan',
    'Angola',
    'Australia',
    'Azerbaijan',
    'Austria',
    'Armenia',
    'Albania',
    'Aruba',
    'Antigua And Barbuda',
    'Andorra',
    'American Samoa',
    'Anguilla',
    'Brazil',
    'Bangladesh',
    'Burkina Faso',
    'Benin',
    'Burundi',
    'Bolivia',
    'Belgium',
    'Belarus',
    'Bulgaria',
    'Bosnia And Herzegovina',
    'Botswana',
    'Bahrain',
    'Bhutan',
    'Brunei',
    'Belize',
    'Bahamas',
    'Barbados',
    'Bermuda',
    'British Virgin Islands',
    'China',
    'Colombia',
    'Canada',
    'Cameroon',
    'Chile',
    'Cambodia',
    'Chad',
    'Cuba',
    'Czech Republic',
    'Costa Rica',
    'Central African Republic',
    'Croatia',
    'Cyprus',
    'Comoros',
    'Cape Verde',
    'Curacao',
    'Cayman Islands',
    'Cook Islands',
    'Dr Congo',
    'Dominican Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Ethiopia',
    'Egypt',
    'Ecuador',
    'El Salvador',
    'Eritrea',
    'Equatorial Guinea',
    'Estonia',
    'Eswatini',
    'France',
    'Finland',
    'Fiji',
    'French Guiana',
    'French Polynesia',
    'Faroe Islands',
    'Falkland Islands',
    'Germany',
    'Ghana',
    'Guatemala',
    'Guinea',
    'Greece',
    'Georgia',
    'Gambia',
    'Gabon',
    'Guinea Bissau',
    'Guyana',
    'Guadeloupe',
    'Guam',
    'Grenada',
    'Greenland',
    'Gibraltar',
    'Haiti',
    'Honduras',
    'Hungary',
    'Hong Kong',
    'India',
    'Indonesia',
    'Iran',
    'Italy',
    'Iraq',
    'Ivory Coast',
    'Ireland',
    'Iceland',
    'Isle Of Man',
    'Japan',
    'Jordan',
    'Jamaica',
    'Kenya',
    'Kazakhstan',
    'Kyrgyzstan',
    'Kuwait',
    'Kiribati',
    'Laos',
    'Libya',
    'Lebanon',
    'Liberia',
    'Lithuania',
    'Lesotho',
    'Latvia',
    'Luxembourg',
    'Liechtenstein',
    'Mexico',
    'Myanmar',
    'Morocco',
    'Malaysia',
    'Mozambique',
    'Madagascar',
    'Mali',
    'Malawi',
    'Mauritania',
    'Moldova',
    'Mongolia',
    'Mauritius',
    'Macau',
    'Montenegro',
    'Maldives',
    'Malta',
    'Martinique',
    'Mayotte',
    'Micronesia',
    'Marshall Islands',
    'Monaco',
    'Montserrat',
    'Nigeria',
    'Nepal',
    'North Korea',
    'Niger',
    'Netherlands',
    'Nicaragua',
    'Norway',
    'New Zealand',
    'Namibia',
    'North Macedonia',
    'New Caledonia',
    'Northern Mariana Islands',
    'Nauru',
    'Niue',
    'Oman',
    'Pakistan',
    'Philippines',
    'Poland',
    'Peru',
    'Portugal',
    'Papua New Guinea',
    'Paraguay',
    'Palestine',
    'Panama',
    'Puerto Rico',
    'Palau',
    'Qatar',
    'Russia',
    'Romania',
    'Rwanda',
    'Republic Of The Congo',
    'Reunion',
    'South Africa',
    'South Korea',
    'Spain',
    'Sudan',
    'Saudi Arabia',
    'Sri Lanka',
    'Syria',
    'Senegal',
    'Somalia',
    'South Sudan',
    'Sweden',
    'Switzerland',
    'Serbia',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Suriname',
    'Sao Tome And Principe',
    'Samoa',
    'Saint Lucia',
    'Saint Vincent And The Grenadines',
    'Seychelles',
    'Saint Kitts And Nevis',
    'Sint Maarten',
    'Saint Martin',
    'San Marino',
    'Saint Barthelemy',
    'Saint Pierre And Miquelon',
    'Turkey',
    'Thailand',
    'Tanzania',
    'Taiwan',
    'Tunisia',
    'Tajikistan',
    'Togo',
    'Turkmenistan',
    'Trinidad And Tobago',
    'Timor Leste',
    'Tonga',
    'Turks And Caicos Islands',
    'Tuvalu',
    'Tokelau',
    'United States',
    'United Kingdom',
    'Uganda',
    'Ukraine',
    'Uzbekistan',
    'United Arab Emirates',
    'Uruguay',
    'United States Virgin Islands',
    'Vietnam',
    'Venezuela',
    'Vanuatu',
    'Vatican City',
    'Western Sahara',
    'Wallis And Futuna',
    'Yemen',
    'Zambia',
    'Zimbabwe'
]

const CountriesFieldComponent = () => {
    const {countries, setCountries, countriesError, setCountriesError} = useContext(AppContext)

    const handleChange = (event, value) => {
        process.nextTick(() => {
            if (value.length > 0) {
                setCountriesError(false)
            } else
                setCountriesError(true)
        })
        setCountries(value)
    }

    const checkError = () => {
        if (countries.length > 0) {
            setCountriesError(false)
        } else
            setCountriesError(true)
    }

    const helperText = useMemo(() => {
        if (countriesError) {
            return 'Countries is required'
        } else return ''
    }, [countriesError])

    return (
        <Autocomplete
            openOnFocus
            onClose={checkError}
            onChange={handleChange}
            multiple
            options={countryItems}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={countriesError}
                    helperText={helperText}
                    variant="filled"
                    label="Countries"
                    placeholder="Country"
                />
            )}
        />
    )
}

export default CountriesFieldComponent