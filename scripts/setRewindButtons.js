const createButtonKey = key => `Key${key.toUpperCase()}`

function setMovingKeys(back, forward) {
    const backButtonKey = createButtonKey(back)
    const forwardButtonKey = createButtonKey(forward)

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

setMovingKeys('q', 'w')
