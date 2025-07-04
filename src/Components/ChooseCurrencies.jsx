import '../App.css'
import CurrencyInput from './CurrencyInput.jsx';

// need to make sure you can choose the same currency in the second dropdown

export default function ChooseCurrencies() {

    return (
        <section className="main-body" >
            <h2>
                Which currencies would you like to convert from and to?
            </h2>
            <CurrencyInput/>
        </section>

    )
}