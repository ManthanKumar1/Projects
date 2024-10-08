import React, { useState } from 'react'
import propTypes from 'prop-types'

export default function TextForm(props) {
    const handleUpClick = () => {
        let newText = text.toUpperCase()
        setText(newText)
    }

    const handleLowClick = () => {
        let newText = text.toLowerCase()
        setText(newText)
    }

    const handleClearText = () => {
        let newText = ""
        setText(newText)
    }

    const handleCopy = () => {
        let newText = document.getElementById('Text')
        newText.select()
        navigator.clipboard.writeText(newText.value)
    }

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/)
        setText(newText.join(" "))
    }

    const handleOnChange = (event) => {
        setText(event.target.value)
    }

    const [text, setText] = useState('Enter text here')

    return (
        <>
            <div className='container my-3'>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} id="Text" rows="5"></textarea>
                </div>
                <button className="btn btn-primary mx-2" onClick={handleUpClick}>Covert to upper case</button>
                <button className="btn btn-primary mx-2" onClick={handleLowClick}>Covert to lower case</button>
                <button className="btn btn-primary mx-2" onClick={handleClearText}>Clear Text</button>
                <button className="btn btn-primary mx-2" onClick={handleCopy}>Copy Text</button>
                <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            </div>
            <div className="container my-3">
                <h2>Your text summary</h2>
                <p>{text.split(' ').length} words and {text.length} characters</p>
                <p>{0.008 * text.split(' ').length} Minutes read</p>
                <h3>Preview</h3>
                <p>{text}</p>
            </div>
        </>
    )
}

TextForm.prototype = {
    heading: propTypes.string
}

TextForm.defaultProps = {
    heading: "Heading"
}