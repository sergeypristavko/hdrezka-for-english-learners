import {CUSTOM_SUBTITLES} from "./selectors";
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

// forgive me father, for I am about to sin
document.addEventListener('fullscreenchange', () => {
    const $subtitlesBlock = document.querySelector(CUSTOM_SUBTITLES)

    $subtitlesBlock.style.fontSize = document.fullscreenElement ? '26px' : '14px'
});
