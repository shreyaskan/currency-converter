import ChooseCurrencies from './Components/ChooseCurrencies';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon className='logo' icon={faMoneyBillTransfer} />
      <h1>
        Currency Conversion App
      </h1>
      <ChooseCurrencies />
      </header>
    </div>
  );
}

export default App;
