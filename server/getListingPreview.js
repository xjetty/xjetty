import {insertBreaks} from "./insertBreaks";

export function getListingPreview(title, description, keywords, countries) {
    let listingPreview = `Title: ${title}`
    if (description)
        listingPreview += `<br />Description: ${insertBreaks(description)}`
    if (keywords.length > 0)
        listingPreview += `<br />Keywords: ${keywords.join(', ')}`
    if (countries.length > 0)
        listingPreview += `<br />Countries: ${countries.join(', ')}`
    return listingPreview
}