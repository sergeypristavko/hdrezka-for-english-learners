import {createButtonKey, findBySelectorAndLabel} from "./utils";

const toggleSubtitles = ({toggleSubsButton, showSubsButton}) => {
    let keydownListener
    let keyupListener
    let isSetUp = false

    const setSubtitlesVisibility = () => {
        const subs = document.querySelector("#subtitles") || {}
        subs.hidden = !subs.hidden
    }

    function setShowSubtitlesKey(toggleSubs, showSubs) {
        const showSubsButtonKey = createButtonKey(showSubs)
        const toggleSubsKey = createButtonKey(toggleSubs)

        const subtitlesBtn = findBySelectorAndLabel('pjsdiv[fid]', 'субтитры')
        subtitlesBtn.click()

        let pressed = false

        keydownListener = ({code}) => {
            if (pressed) {
                return;
            }

            if (code === toggleSubsKey) {
                setSubtitlesVisibility()
                return;
            }

            if (code !== showSubsButtonKey || pressed) return;
            pressed = true

            setSubtitlesVisibility()
        }

        keyupListener = ({code}) => {
            if (code !== showSubsButtonKey) return;
            pressed = false
            setSubtitlesVisibility()
        }

        document.addEventListener('keydown', keydownListener)
        document.addEventListener('keyup', keyupListener)
    }

    const cleanUp = () => {
        document.removeEventListener('keydown', keydownListener)
        document.removeEventListener('keyup', keyupListener)
        isSetUp = false
    }

    const translatorsList = document.querySelector("#translators-list")

    const isOriginal = () => {
        const active = translatorsList.querySelector('.active')
        return active.textContent.toLowerCase().includes('оригинал (+субтитры)')
    }

    const setUp = () => {
        if (isOriginal()) {
            if (isSetUp) return;
            setShowSubtitlesKey(toggleSubsButton, showSubsButton)
            isSetUp = true
        } else {
            cleanUp()
        }
    }

    const setObserver = () =>
        new MutationObserver(setUp).observe(translatorsList, { attributes: true, childList: true, subtree: true })

    isOriginal() ? setUp() : setObserver()
}

export default toggleSubtitles
