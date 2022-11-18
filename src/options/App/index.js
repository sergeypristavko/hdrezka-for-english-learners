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
import './styles.css'

const App = () => {
    const [loading, setLoading] = useState(true)
    const [inputs, setInputs] = useState([
        {
            label: 'Forward',
            id: FORWARD_BUTTON_ID,
            type: 'text',
        },
        {
            label: 'Back',
            id: BACK_BUTTON_ID,
            type: 'text',
        },
        {
            label: 'Toggle subtitles',
            id: TOGGLE_SUBS_ID,
            type: 'text',
        },
        {
            label: 'Show subtitles',
            id: SHOW_SUBS_ID,
            type: 'text',
        },
        {
            label: 'Rewind to prev quote',
            id: PREV_QUOTE_ID,
            type: 'text',
        },
        {
            label: 'Rewind interval (number)',
            id: REWIND_INTERVAL_ID,
            type: 'number',
        },
        {
            label: 'Dictionary',
            type: 'select',
            id: DICTIONARY_BASE_ID,
            options: [
                {
                    label: 'WooordHunt',
                    value: 'https://wooordhunt.ru/word/'
                },
                {
                    label: 'Cambridge Dictionary',
                    value: 'https://dictionary.cambridge.org/dictionary/english/'
                },
                {
                    label: 'Collins Dictionary',
                    value: 'https://www.collinsdictionary.com/dictionary/english/'
                }
            ]
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
        <div className='wrapper'>
            <main className='content'>
                <h1 className='title'>HDrezka plugin for English learners</h1>

                <div className="inputs">
                    {inputs.map(inputInfo =>
                        <Input
                            key={inputInfo.id}
                            storageKey={inputInfo.id}
                            defaultValue={inputInfo.value}
                            label={inputInfo.label}
                            type={inputInfo.type}
                            options={inputInfo.options}
                        />
                    )}
                </div>
            </main>
        </div>
    )
}

export default App
