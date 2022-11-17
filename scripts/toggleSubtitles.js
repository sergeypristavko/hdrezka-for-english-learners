const createButtonKey = key => `Key${key.toUpperCase()}`

let keydownListener
let keyupListener

function setShowSubtitlesKey(toggleSubs, showSubs) {
    const showSubsButtonKey = createButtonKey(showSubs)
    const toggleSubsKey = createButtonKey(toggleSubs)

    const findBySelectorAndLabel = (selector, label) =>
        [...document.querySelectorAll(selector)].map(x => [...x.children]).flat().find(x => x.innerHTML.toLowerCase() === label)?.parentElement

    const subtitlesBtn = findBySelectorAndLabel('pjsdiv[fid]', 'субтитры')
    subtitlesBtn.click()

    const engSubtitlesBtn = findBySelectorAndLabel('pjsdiv[f2id]', 'english')
    const turnOffSubtitlesBtn = findBySelectorAndLabel('pjsdiv[f2id]', 'откл.')

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
