import Input from "./Input";
import {useEffect, useState} from "react";
import {
    BACK_BUTTON_ID, defaultValues,
    DICTIONARY_BASE_ID,
    FORWARD_BUTTON_ID, PREV_QUOTE_ID,
    REWIND_INTERVAL_ID,
    SHOW_SUBS_ID,
    TOGGLE_SUBS_ID
} from "../../constants";

const dictionariesUrls = {
    wooordHunt: 'https://wooordhunt.ru/word/',
    cambridge: 'https://dictionary.cambridge.org/dictionary/english/',
    collins: 'https://www.collinsdictionary.com/dictionary/english/'
}

const App = () => {
    const [loading, setLoading] = useState(true)
    const [inputs, setInputs] = useState([
        {
            label: 'Forward',
            id: FORWARD_BUTTON_ID,
        },
        {
            label: 'Back',
            id: BACK_BUTTON_ID,
        },
        {
            label: 'Toggle subtitles',
            id: TOGGLE_SUBS_ID,
        },
        {
            label: 'Show subtitles',
            id: SHOW_SUBS_ID,
        },
        {
            label: 'Rewind to prev quote',
            id: PREV_QUOTE_ID,
        },
        {
            label: 'Rewind interval (number)',
            id: REWIND_INTERVAL_ID,
        },
        {
            label: 'Dictionary',
            type: 'select',
            id: DICTIONARY_BASE_ID,
        },
    ])

    useEffect(() => {
        chrome.storage.sync.get(inputs.map(({ id }) => id))
            .then(values => {
                const updatedInputs = inputs.map(inputInfo => {
                    inputInfo.value = values[inputInfo.id] || defaultValues[inputInfo.id]
                    return inputInfo
                })
                setInputs(updatedInputs)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <>Loading...</>
    }

    return (
        <main className='wrapper'>
            <h2>HDrezka plugin for English learners</h2>

            {inputs.map(inputInfo =>
                <Input
                    key={inputInfo.id}
                    storageKey={inputInfo.id}
                    defaultValue={inputInfo.value}
                    label={inputInfo.label}
                />
            )}
        </main>
    )
}

export default App
