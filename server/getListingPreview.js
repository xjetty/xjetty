import {insertBreaks} from "./insertBreaks";

export function getListingPreview(title, description, keywords) {
    let listingPreview = `Title: ${title}`
    if (description)
        listingPreview += `<br />Description: ${insertBreaks(description)}`
    if (keywords.length > 0)
        listingPreview += `<br />Keywords: ${keywords.join(', ')}`
    return listingPreview
}