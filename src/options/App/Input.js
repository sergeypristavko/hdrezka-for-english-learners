import {useState} from "react";

const Input = ({ defaultValue, label, storageKey, type, options }) => {
    const [value, setValue] = useState(defaultValue)

    const updateValue = ({ target: { value }}) => {
        if (type === 'text') {
            const hasInvalidCharacters = /[\W\d]/g.test(value)
            if (hasInvalidCharacters) {
                return;
            }
        }

        chrome.storage.sync.set({ [storageKey]: value })
        setValue(value)
    }

    if (type === 'select' && options) {
        return (
            <div className='input-wrapper'>
                <label htmlFor={storageKey}>{label}</label>
                <select value={value} onChange={updateValue} name={storageKey} id={storageKey}>
                    {options.map(option =>
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    )}
                </select>
            </div>

        )
    }

    return (
        <div className='input-wrapper'>
            <label className='label' htmlFor={label}>{label}</label>
            <input
                maxLength={1}
                className='input'
                id={label}
                type={type}
                onClick={({ target }) => target.select()}
                value={type === 'text' ? value.toUpperCase() : value}
                onChange={updateValue}
            />
        </div>
    )
}

export default Input
