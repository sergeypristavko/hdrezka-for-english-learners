const createButtonKey2 = key => `Key${key.toUpperCase()}`

function setRewindKeys(back, forward) {
    const backButtonKey = createButtonKey2(back)
    const forwardButtonKey = createButtonKey2(forward)

    const keysMap = {
        [backButtonKey]: 37,
        [forwardButtonKey]: 39,
    }

    const listener = ({code}) => {
        if ([backButtonKey, forwardButtonKey].includes(code)) {
            const keyCode = keysMap[code]

            const event = new KeyboardEvent('keydown', {
                keyCode,
                bubbles: true,
            })

            document.body.dispatchEvent(event)
        }
    }

    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
}

setRewindKeys('q', 'w')
