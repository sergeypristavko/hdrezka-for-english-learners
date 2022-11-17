import {clearHTMLTags} from "./utils";
import '../styles/style.css'
import {
    ORIGINAL_SUBS_TEXT,
    ORIGINAL_SUBS_WRAPPER,
    PLAY_BUTTON,
    PLAYER_BACKGROUND,
    PLAYER_BODY,
    VIDEO
} from "./constants";

const replaceSubtitles = ({ dictionaryBase }) => {
    const playBackground = document.querySelector(PLAYER_BACKGROUND)
    const playButton = document.querySelector(PLAY_BUTTON)
    const video = document.querySelector(VIDEO)

    const getSubsWrapper = () => document.querySelector(ORIGINAL_SUBS_WRAPPER)
    const getSubsText = () => clearHTMLTags(document.querySelector(ORIGINAL_SUBS_TEXT)?.innerHTML || '')

    let initialized = false

    const listener = () => {
        if (initialized) return;
        initialized = true

        const activate = () => {
            let prevSubsText = getSubsText()

            const callback = () => {
                const subsText = getSubsText()

                if (prevSubsText !== subsText) {
                    prevSubsText = subsText
                    if (subsText) {
                        window.prevQuoteTime = video.currentTime
                    }
                    rerenderSubs(subsText)
                }
            }

            const observer = new MutationObserver(callback)

            callback()

            observer.observe(getSubsWrapper(), {childList: true})

            const rerenderSubs = text => {
                const playerBody = document.querySelector(PLAYER_BODY)

                const div = document.createElement('div')
                const id = 'subtitles'

                div.onmouseover = () => {}

                let textNew = text.split(' ').map(word => `
                <a href='${dictionaryBase}${encodeURIComponent(word.replace(/\W/gm, ''))}' target="_blank">${word}</a>
            `).join(' ')

                const subtitlesBlock = playerBody.querySelector(`#${id}`)

                if (subtitlesBlock) {
                    subtitlesBlock.innerHTML = textNew
                    return;
                }

                div.id = id
                div.innerHTML = textNew
                div.classList.add('subtitles-text')
                playerBody.append(div)
            }
        }

        setTimeout(() => {
            const interval = setInterval(() => {
                const subsWrapper = getSubsWrapper()

                if (subsWrapper) {
                    subsWrapper.style.opacity = 0
                    activate()
                    clearInterval(interval)
                }
            }, 50)
        }, 1000)
    };

    [playButton, playBackground].forEach(el => el.addEventListener('click', listener, {once: true}))
}

export default replaceSubtitles
