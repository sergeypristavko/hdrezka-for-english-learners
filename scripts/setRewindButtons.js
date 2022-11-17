function setRewindKeys(back, forward, prevQuote) {
    const video = document.querySelector("#oframecdnplayer  video")

    const rewind = value => video.currentTime += value
    const createButtonKey = key => `Key${key.toUpperCase()}`

    const backButtonKey = createButtonKey(back)
    const forwardButtonKey = createButtonKey(forward)
    const prevQuoteKey = createButtonKey(prevQuote)

    const listener = ({code}) => {
        if (code === backButtonKey) {
            rewind(-5)
        }
        if (code === forwardButtonKey) {
            rewind(5)
        }
        if (code === prevQuoteKey) {
            if (window.prevQuoteTime) {
                video.currentTime = window.prevQuoteTime - 2
                window.prevQuoteTime = 0
            } else {
                rewind(-5)
            }
        }
    }

    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
}

setRewindKeys('q', 'w', 'a')
