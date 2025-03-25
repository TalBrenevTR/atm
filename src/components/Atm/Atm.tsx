import { useState } from "react";
import { Screen } from "./Screen";

function Atm({ cardNumber } : { cardNumber: string }) {
  let user, setUser = useState(null);

  let labels = [null,
                null,
                null,
                null,
                null,
                null,
                null,
                "Enter PIN"];

  let handlers = [null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  () => {console.log("Test")}];

  return (
    <div className="Atm">
      <div className="atm-header">
        <img className="atm-sign" src="img/atm_sign.png" alt="ATM - 24 Hour Banking" />
        <img className="atm-sign-graffiti" src="img/graffiti.png" alt="" />
      </div>
      <div className="atm-body">
        <Screen mainText="Welcome to the ATM"
                buttonLabels={labels}
                buttonHandlers={handlers}/>
      </div>
    </div>
  );
}

export default Atm;
