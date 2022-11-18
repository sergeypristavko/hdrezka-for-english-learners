import initToggleSubtitles from './toggleSubtitles'
import initRewindButtons from './setRewindButtons'
import initReplaceSubtitles from './replaceSubtitles'
import {
    BACK_BUTTON_ID,
    DICTIONARY_BASE_ID,
    FORWARD_BUTTON_ID,
    PREV_QUOTE_ID,
    REWIND_INTERVAL_ID,
    SHOW_SUBS_ID,
    TOGGLE_SUBS_ID,
    cachedValueOrDefault
} from "../constants";

chrome.storage.sync.get([
    BACK_BUTTON_ID,
    DICTIONARY_BASE_ID,
    PREV_QUOTE_ID,
    REWIND_INTERVAL_ID,
    SHOW_SUBS_ID,
    TOGGLE_SUBS_ID
]).then(hotKeysMap => {
    initToggleSubtitles({
        toggleSubsButton: cachedValueOrDefault(hotKeysMap, TOGGLE_SUBS_ID),
        showSubsButton: cachedValueOrDefault(hotKeysMap, SHOW_SUBS_ID)
    })

    initRewindButtons({
        back: cachedValueOrDefault(hotKeysMap, BACK_BUTTON_ID),
        forward: cachedValueOrDefault(hotKeysMap, FORWARD_BUTTON_ID),
        prevQuote: cachedValueOrDefault(hotKeysMap, PREV_QUOTE_ID),
        rewindInterval: cachedValueOrDefault(hotKeysMap, REWIND_INTERVAL_ID),
    })

    initReplaceSubtitles({
        dictionaryBase: cachedValueOrDefault(hotKeysMap, DICTIONARY_BASE_ID)
    })
})
