import initToggleSubtitles from './toggleSubtitles'
import initRewindButtons from './setRewindButtons'
import initReplaceSubtitles from './replaceSubtitles'

const dictionariesUrls = {
    wooordHunt: 'https://wooordhunt.ru/word/',
    cambridge: 'https://dictionary.cambridge.org/dictionary/english/',
    collins: 'https://www.collinsdictionary.com/dictionary/english/'
}

initToggleSubtitles({
    toggleSubsButton: 'r',
    showSubsButton: 'e'
})

initRewindButtons({
    back: 'q',
    forward: 'w',
    prevQuote: 'a',
    rewindInterval: 5,
})

initReplaceSubtitles({
    dictionaryBase: dictionariesUrls.cambridge
})
