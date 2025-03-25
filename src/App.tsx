import { useState } from 'react';
import { Atm } from './components/Atm';
import { CardReader } from './components/CardReader';
import { ApiContext, MockApi } from "./api";

function App() {
  let [cardNumber, setCardNumber] = useState<string | null>(null);

  return (
    <ApiContext value={new MockApi()}>
      {(!cardNumber) &&
       <CardReader setCardNumber={(cardNumber) => setCardNumber(cardNumber)} />}
      <div className="App">
        <Atm cardNumber={cardNumber}
             exit={() => setCardNumber(null)}/>
      </div>
    </ApiContext>
  )
}

export default App;
