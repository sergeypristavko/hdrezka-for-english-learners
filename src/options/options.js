import ReactDOM from "react-dom";
import {useState} from "react";
import './options.css'

const app = document.getElementById("app");

const inputs = [
    {
        label: 'Forward',
        id: 'forward-button',
    },
    {
        label: 'Back',
        id: 'back-button',
    }
]


const Input = ({ defaultValue, label, storageKey }) => {
    const [text, setText] = useState(defaultValue)

    chrome.storage.sync.get([storageKey], function(result) {
        console.log('Value currently is ', result);
    });

    const updateValue = ({ target: { value }}) => {
        chrome.storage.sync.set({
            [storageKey]: value
        }, () => {
            console.log('Value is set to ' + value);
        })
        setText(value)
    }

    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input
                maxLength={1}
                className='input'
                id={label}
                type="text"
                onClick={({ target }) => target.select()}
                value={(text || '').toUpperCase()}
                onChange={updateValue}
            />
        </div>
    )
}

ReactDOM.render((
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
), app);
