import { clearHTMLTags } from "./utils";
import '../styles/style.css'

const replaceSubtitles = () => {
    const playBackground = document.querySelector("#oframecdnplayer > pjsdiv:nth-child(3)")
    const playButton = document.querySelector("#oframecdnplayer > pjsdiv:nth-child(20) > pjsdiv:nth-child(1) > pjsdiv")

    let isSetup = false

    const listener = () => {
        if (isSetup) return;

        isSetup = true

        const getSubsWrapper = () => document.querySelector("#oframecdnplayer > pjsdiv:nth-child(29)")

        const video = document.querySelector("#oframecdnplayer  video")

        const activate = () => {
            const getSubsText = () => document.querySelector("#oframecdnplayer > pjsdiv:nth-child(29) > span")?.innerHTML?.replaceAll('<br>', ' ')

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

            observer.observe(getSubsWrapper(), {  childList: true })

            const rerenderSubs = (text = '') => {
                const playerBody = document.querySelector("#oframecdnplayer")

                const div = document.createElement('div')
                const id = 'subtitles'

                div.onmouseover = () => {}

                let textNew = clearHTMLTags(text).split(' ').map(word => `
                <a href='https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(word)}' target="_blank">${word}</a>
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

    [playButton, playBackground].forEach(el => el.addEventListener('click', listener, { once: true }))
}

export default replaceSubtitles
