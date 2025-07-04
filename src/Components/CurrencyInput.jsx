import '../App.css'
import { useCallback, useState, useRef } from 'react'
import { CURRENCY_CODES } from '../data/currencycodes.js'
import ConversionAmount from "./ConversionAmount.jsx";
import Swap from "./Swap.jsx";

export default function CurrencyInput() {

    const [convRate, setConvRate] = useState(2);

    const firstSelectedCurrency = useRef();
    const secondSelectedCurrency = useRef();

    const [firstCode, setFirstCode] = useState('');
    const [secondCode, setSecondCode] = useState('');

    const [submitted, setSubmitted] = useState(false);

    const [sameCurrency, setSameCurrency] = useState(false);

    const conversionRateCalc = useCallback(async function conversionRateCalc(cur1, cur2) {

        let baseConvRate1;
        let baseConvRate2;

        try {
            const result1 = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=c997443d7c128116649d01dbcca1c18a&symbols=${cur1},${cur2}`)
            const resultJSON = await result1.json()
            baseConvRate1 = resultJSON.rates[cur1];
            baseConvRate2 = resultJSON.rates[cur2];
            console.log('API request sent')

        }
        catch (error) {
            console.log('Error 1:' + error)
        }

        setConvRate((baseConvRate2 / baseConvRate1).toFixed(5))
    }, [])

    function handleSubmit() {

        if (firstSelectedCurrency.current.value === secondSelectedCurrency.current.value) {
            console.log('same currency chosen')
            setSameCurrency(true);
        }
        else {
            setSubmitted(true);
            const cur1 = CURRENCY_CODES.filter(currencycode => currencycode.Title === firstSelectedCurrency.current.value)[0].Code;
            setFirstCode(cur1);

            const cur2 = CURRENCY_CODES.filter(currencycode => currencycode.Title === secondSelectedCurrency.current.value)[0].Code;
            setSecondCode(cur2);

            conversionRateCalc(cur1, cur2);
            
            setSameCurrency(false);
        }
    }



    return (
        <>
            <div className='input-section'>
                <div>
                    Currency From:
                    <select ref={firstSelectedCurrency}>
                        {CURRENCY_CODES.map(({ Title, Code }, index) => {
                            return (
                                <option key={Code} value={Title}>{Title}</option>
                            )
                        })}
                    </select>
                </div>
                <Swap
                    firstSelectedCurrency={firstSelectedCurrency}
                    secondSelectedCurrency={secondSelectedCurrency}
                    setSubmitted={setSubmitted} />
                <div>
                    Currency To:
                    <select ref={secondSelectedCurrency} >
                        {CURRENCY_CODES.map(({ Title }, index) => {
                            return (
                                <option key={index} value={Title}>{Title}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            {sameCurrency && (<div className='button-div'>
                You've chosen the same currencies, choose again!
            </div>)}
            <div className='button-div'>
                <button className='submit-button' onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            {submitted && (
                <>
                    <div className='button-div'>
                        <ConversionAmount
                            firstCode={firstCode}
                            secondCode={secondCode}
                            convRate={convRate}
                        />
                    </div>

                </>
            )}
        </>
    )
}