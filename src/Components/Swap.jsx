import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

export default function Swap({ firstSelectedCurrency, secondSelectedCurrency, setSubmitted }) {

    function swap() {
        const firstRef = firstSelectedCurrency.current.value;
        firstSelectedCurrency.current.value = secondSelectedCurrency.current.value;
        secondSelectedCurrency.current.value = firstRef;

        setSubmitted(false);
    }

    return (
        <div className='button-div'>
            <button className="swap-button" onClick={swap}>
                <FontAwesomeIcon icon={faArrowsRotate} />
                <span> SWAP</span>
            </button>
        </div>
    )
}