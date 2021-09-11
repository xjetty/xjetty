import {insertBreaks} from "./insertBreaks";

export function getPostPreview(mode, platforms, category, subcategory, title, description, keywords) {
    let postPreview = `Mode: ${mode}<br />Platforms: ${platforms.join(', ')}<br />Category: ${category}`
    if (subcategory)
        postPreview += `<br />Subcategory: ${subcategory}`
    postPreview += `<br />Title: ${title}<br />Description: ${insertBreaks(description)}`
    if (keywords.length > 0)
        postPreview += `<br />Keywords: ${keywords.join(', ')}`
    return postPreview
}