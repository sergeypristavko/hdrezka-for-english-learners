import {CUSTOM_SUBTITLES} from "./constants";
import '../styles/style.css'

const Subtitles = (dictionaryBase, text, insidesOnly) => {
    const subtitles =
        `${text.split(' ').map(word => `
            <a href='${dictionaryBase}${encodeURIComponent(word.replace(/\W/gm, ''))}' target="_blank">${word}</a>
       `).join(' ')}`

    if (insidesOnly) {
        return subtitles
    }

    return `
        <div id="${CUSTOM_SUBTITLES.replace('#', '')}" class="subtitles-text">
            ${subtitles}
        </div>
    `
}

export default Subtitles
