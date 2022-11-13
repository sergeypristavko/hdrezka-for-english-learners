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

    document.addEventListener('keydown', ({code}) => {
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
    })

    document.addEventListener('keyup', ({code}) => {
        if (code !== showSubsButtonKey) return;
        pressed = false

        turnOffSubtitlesBtn.click()
    })
}
// setShowSubtitlesKey('r', 'e')


const translatorsList = document.querySelector("#translators-list")

const isOriginal = () => {
    const active = translatorsList.querySelector('.active')
    return active.textContent.toUpperCase().includes('Оригинал (+субтитры)'.toUpperCase())
}

let setUp = false

const observer = () => {
    if (isOriginal() || !setUp) {
        setShowSubtitlesKey('r', 'e')
        setUp = true
    }
}

const setObserver = () =>
    new MutationObserver(observer).observe(translatorsList, { attributes: true, childList: true, subtree: true })

isOriginal() ? observer() : setObserver()
