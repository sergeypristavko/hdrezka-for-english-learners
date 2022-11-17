import initToggleSubtitles from './toggleSubtitles'
import initRewindButtons from './setRewindButtons'
import initReplaceSubtitles from './replaceSubtitles'

initToggleSubtitles({
    toggleSubsButton: 'r',
    showSubsButton: 'e'
})

initRewindButtons({
    back: 'q',
    forward: 'w',
    prevQuote: 'a'
})

initReplaceSubtitles()
