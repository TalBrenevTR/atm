import { useState } from "react";
import { Screen } from "./Screen";

const nulls = [null,
               null,
               null,
               null,
               null,
               null,
               null,
               null];

function Atm({ cardNumber } : { cardNumber: string | null }) {
  let [user, setUser] = useState(null);

  let buttonLabels: Array<string | null> = nulls.slice();
  let buttonHandlers: Array<null | (() => void)> = nulls.slice();
  let mainText = "";

  if (cardNumber) {
    if (!user) {
      buttonLabels[7] = "Enter PIN";
      buttonHandlers[7] = () =>  console.log("Test");
      mainText = "Welcome to the ATM";
    }
  }

  return (
    <div className="Atm">
      <div className="atm-header">
        <img className="atm-sign" src="img/atm_sign.png" alt="ATM - 24 Hour Banking" />
        <img className="atm-sign-graffiti" src="img/graffiti.png" alt="" />
      </div>
      <div className="atm-body">
        <Screen mainText={mainText}
                buttonLabels={buttonLabels}
                buttonHandlers={buttonHandlers}/>
        <div className="atm-footer">
          <img className="systems" src="img/systems.png" alt="Systems" />
          <img className="sticker" src="img/sticker_graf.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Atm;
