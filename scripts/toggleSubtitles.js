const createButtonKey = key => `Key${key.toUpperCase()}`

let keydownListener
let keyupListener

function setShowSubtitlesKey(toggleSubs, showSubs) {
    const showSubsButtonKey = createButtonKey(showSubs)
    const toggleSubsKey = createButtonKey(toggleSubs)

    const subtitlesBtn = document.querySelector("#cdnplayer_settings > pjsdiv > pjsdiv:nth-child(3)")
    subtitlesBtn.click()

    const engSubtitlesBtn = document.querySelector("#cdnplayer_settings > pjsdiv > pjsdiv:nth-child(8)")
    const turnOffSubtitlesBtn = document.querySelector("#cdnplayer_settings > pjsdiv > pjsdiv:nth-child(9)")

    turnOffSubtitlesBtn.click()

    let pressed = false
    let lastClickedButton = turnOffSubtitlesBtn

    let keydownListener = ({code}) => {
        if (pressed) return;

        if (code === toggleSubsKey) {
            const target = lastClickedButton === turnOffSubtitlesBtn ? engSubtitlesBtn : turnOffSubtitlesBtn
            target.click()
            lastClickedButton = target
            return;
        }

        if (code !== showSubsButtonKey || pressed) return;
        pressed = true

        engSubtitlesBtn.click()
    }

    let keyupListener = ({code}) => {
        if (code !== showSubsButtonKey) return;
        pressed = false

        turnOffSubtitlesBtn.click()
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

let isSetUp = false

const setUp = () => {
    if (isOriginal()) {
        if (isSetUp) return;
        setShowSubtitlesKey('r', 'e')
        isSetUp = true
    } else {
        cleanUp()
    }
}

const setObserver = () =>
    new MutationObserver(setUp).observe(translatorsList, { attributes: true, childList: true, subtree: true })

isOriginal() ? setUp() : setObserver()
