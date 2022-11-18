import {useState} from "react";

const Input = ({ defaultValue, label, storageKey }) => {
    const [value, setValue] = useState(defaultValue)

    const updateValue = ({ target: { value }}) => {
        chrome.storage.sync.set({ [storageKey]: value })
        setValue(value)
    }

    const isText = typeof defaultValue === 'string'

    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input
                maxLength={1}
                className='input'
                id={label}
                type={isText ? 'text' : 'number'}
                onClick={({ target }) => target.select()}
                value={isText ? value.toUpperCase() : value}
                onChange={updateValue}
            />
        </div>
    )
}

export default Input
