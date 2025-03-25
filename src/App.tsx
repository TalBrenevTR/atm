import { useState } from 'react';
import { Atm } from './components/Atm';
import { CardReader } from './components/CardReader';

function App() {
  let [cardNumber, setCardNumber] = useState<string | null>(null);

  return (
    <>
      {(!cardNumber) &&
       <CardReader setCardNumber={(cardNumber) => setCardNumber(cardNumber)} />}
      <div className="App">
        <Atm cardNumber={cardNumber} />
      </div>
    </>
  )
}

export default App;
