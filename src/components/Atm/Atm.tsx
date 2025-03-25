import { useState } from "react";
import { Screen } from "./Screen";
import { Keypad } from "./Keypad";

const nulls = [null,
               null,
               null,
               null,
               null,
               null,
               null,
               null];

function Atm({ cardNumber, exit } :
             { cardNumber: string | null,
               exit: () => void }) {
  let [user, setUser] = useState(null);
  let [pin, setPin] = useState("");

  function handleExit() {
    setUser(null);
    exit()
  }

  function handleKeypadPress(key: string) {
    if (cardNumber && !user) {
      if (key === "DEL") {
        setPin(pin.slice(0, -1));
      }
      else if (pin.length < 4) {
        setPin(pin + key);
      }
    }
  }

  function submitPin() {
  }

  let buttonLabels: Array<string | null> = nulls.slice();
  let buttonHandlers: Array<null | (() => void)> = nulls.slice();
  let mainText = "";
  let typedText = "";

  if (cardNumber) {
    if (!user) {
      buttonLabels[3] = "Exit";
      buttonHandlers[3] = handleExit;
      buttonLabels[7] = "Submit";
      buttonHandlers[7] = submitPin;
      mainText = "Please enter your PIN:"
      typedText = pin.replace(/./g, "*");
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
                typedText={typedText}
                buttonLabels={buttonLabels}
                buttonHandlers={buttonHandlers}/>
        <div className="atm-footer">
          <img className="systems" src="img/systems.png" alt="Systems" />
          <img className="sticker" src="img/sticker_graf.png" alt="" />
        </div>
        <Keypad onKeyPress={handleKeypadPress} />
      </div>
    </div>
  );
}

export default Atm;
