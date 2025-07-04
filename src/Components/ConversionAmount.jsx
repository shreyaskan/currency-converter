import '../App.css'
import { useState, useRef } from 'react'

export default function ConversionAmount({ firstCode, secondCode, convRate }) {

    const firstConvInput = useRef(0);

    const [updatedSecondConvInput, setUpdatedSecondConvInput] = useState(0);

    function currencyConvResult() {
        setUpdatedSecondConvInput((firstConvInput.current.value * convRate).toFixed(2))
    }

    let conversionMessage;

    if (firstConvInput.current.value > 0) {
        conversionMessage = <>
            converts to
            <span> {updatedSecondConvInput}</span>
            <span> {secondCode}</span></>
    }

    return (
        <div className="conv-amount-section">
            <div>
                <input
                    ref={firstConvInput}
                    type="number"
                    onChange={currencyConvResult} />
                <span>{firstCode} </span>
                {conversionMessage}
            </div>
        </div>
    )
}