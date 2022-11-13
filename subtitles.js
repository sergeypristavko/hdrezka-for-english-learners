function setHotKeys({ back, forward, showSubs, toggleSubs }) {
    const createButtonKey = key => `Key${key.toUpperCase()}`

    function setMovingKeys() {
        const backButtonKey = createButtonKey(back)
        const forwardButtonKey = createButtonKey(forward)

        const keysMap = {
            [backButtonKey]: 37,
            [forwardButtonKey]: 39,
        }

        document.addEventListener('keydown', ({code}) => {
            if ([backButtonKey, forwardButtonKey].includes(code)) {
                const keyCode = keysMap[code]

                const event = new KeyboardEvent('keydown', {
                    keyCode,
                    bubbles: true,
                })

                document.body.dispatchEvent(event)
            }
        })
    }

    function setShowSubtitlesKey() {
        const showSubsButtonKey = createButtonKey(showSubs)
        const toggleSubsKey = createButtonKey(toggleSubs)

        const findBySelectorAndLabel = (selector, label) =>
            [...document.querySelectorAll(selector)].map(x => [...x.children]).flat().find(x => x.innerHTML.toLowerCase() === label).parentElement

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

    setMovingKeys()
    setShowSubtitlesKey()
}

setHotKeys({
    back: 'q',
    forward: 'w',
    showSubs: 'e',
    toggleSubs: 'r'
})
