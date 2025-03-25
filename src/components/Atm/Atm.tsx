import { useState, useContext } from "react";
import BigNumber from "bignumber.js";
import { Screen } from "./Screen";
import { Keypad } from "./Keypad";
import { Cards } from "./Cards";
import { ApiContext, User } from '../../api';

const nulls = [null,
               null,
               null,
               null,
               null,
               null,
               null,
               null];

const amountOptions = [20,
                       50,
                       100,
                       250,
                       500,
                       1000,
                       1500];

function Atm({ cardNumber, exit } :
             { cardNumber: string | null,
               exit: () => void }) {
  let [user, setUser] = useState<User | null>(null);
  let [pin, setPin] = useState("");
  let [error, setError] = useState<string | null>(null);
  let [loading, setLoading] = useState<boolean>(false);
  let [page, setPage] = useState("HOME");
  let [balance, setBalance] = useState<BigNumber>(BigNumber(0));

  const api = useContext(ApiContext);

  function resetState() {
    setUser(null);
    setPin("");
    setError(null);
    setLoading(false);
    setPage("HOME");
    setBalance(BigNumber(0));
  }

  function handleExit() {
    resetState();
    exit();
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
    setLoading(true);
    api.authenticate(cardNumber as string,
                     pin,
                     setUser,
                     setError,
                     () => setLoading(false));
  }

  let buttonLabels: Array<string | null> = nulls.slice();
  let buttonHandlers: Array<null | (() => void)> = nulls.slice();
  let mainText = "";
  let typedText = "";

  if (loading) {
    mainText = "Loading...";
  }

  else if (error) {
    switch (error) {
      case "CARD_INVALID":
        mainText = "Your card is invalid."
        buttonLabels[7] = "Exit";
        buttonHandlers[7] = handleExit;
        break

      case "INCORRECT_PIN":
        mainText = "The PIN you entered is incorrect."
        buttonLabels[3] = "Exit";
        buttonHandlers[3] = handleExit;
        buttonLabels[7] = "Re-Enter PIN";
        buttonHandlers[7] = resetState;
        break

      case "UNAUTHORIZED":
        mainText = "Your session expired."
        buttonLabels[3] = "Exit";
        buttonHandlers[3] = handleExit;
        buttonLabels[7] = "Re-Enter PIN";
        buttonHandlers[7] = resetState;
        break

      case "INSUFFICIENT_FUNDS":
        mainText = "You do not have sufficient funds."
        buttonLabels[3] = "Exit";
        buttonHandlers[3] = handleExit;
        buttonLabels[7] = "Back";
        buttonHandlers[7] = () => {
          setPage("WITHDRAW");
          setError(null);
        };
        break
    }
  }

  else if (cardNumber) {
    if (!user) {
      mainText = "Please enter your PIN:"
      typedText = pin.replace(/./g, "*");
      buttonLabels[3] = "Exit";
      buttonHandlers[3] = handleExit;
      buttonLabels[7] = "Submit";
      buttonHandlers[7] = submitPin;
    }

    else if (page === "HOME") {
      mainText = "Hi " + user.name + "! Please make a choice:"
      buttonLabels[2] = "Withdraw";
      buttonHandlers[2] = () => setPage("WITHDRAW");
      buttonLabels[3] = "Deposit";
      buttonHandlers[3] = () => setPage("DEPOSIT");
      buttonLabels[5] = "Exit";
      buttonHandlers[5] = handleExit;
      buttonLabels[6] = "Balance";
      buttonHandlers[6] = () => {
        setLoading(true);
        setPage("BALANCE");
        api.getBalance((user as User).token,
                       setBalance,
                       setError,
                       () => setLoading(false));
      };
      buttonLabels[7] = "Re-Enter PIN";
      buttonHandlers[7] = resetState;
    }

    else if (page === "BALANCE") {
      mainText = "Your balance is: $" + balance.toFixed(2);
      buttonLabels[3] = "Exit";
      buttonHandlers[3] = handleExit;
      buttonLabels[7] = "Back";
      buttonHandlers[7] = () => setPage("HOME");
    }

    else if (page === "WITHDRAW") {
      mainText = "How much to withdraw?"
      amountOptions.forEach((amount, idx) => {
        buttonLabels[idx] = "$" + amount;
        buttonHandlers[idx] = () => {
          setLoading(true);
          api.withdraw((user as User).token,
                       BigNumber(amount),
                       (newBalance) => { setBalance(newBalance);
                                         setPage("WITHDRAW_DONE"); },
                       setError,
                       () => setLoading(false));
        };
      });
      buttonLabels[7] = "Cancel";
      buttonHandlers[7] = () => setPage("HOME");
    }

    else if (page === "WITHDRAW_DONE") {
      mainText = "Withdrawal completed. Your new balance is: $" + balance.toFixed(2);
      buttonLabels[3] = "Exit";
      buttonHandlers[3] = handleExit;
      buttonLabels[7] = "Back";
      buttonHandlers[7] = () => setPage("HOME");
    }

    else if (page === "DEPOSIT") {
      mainText = "How much to deposit?"
      amountOptions.forEach((amount, idx) => {
        buttonLabels[idx] = "$" + amount;
        buttonHandlers[idx] = () => {
          setLoading(true);
          api.deposit((user as User).token,
                      BigNumber(amount),
                      (newBalance) => { setBalance(newBalance);
                                        setPage("DEPOSIT_DONE"); },
                      setError,
                      () => setLoading(false));
        };
      });
      buttonLabels[7] = "Cancel";
      buttonHandlers[7] = () => setPage("HOME");
    }

    else if (page === "DEPOSIT_DONE") {
      mainText = "Deposit completed. Your new balance is: $" + balance.toFixed(2);
      buttonLabels[3] = "Exit";
      buttonHandlers[3] = handleExit;
      buttonLabels[7] = "Back";
      buttonHandlers[7] = () => setPage("HOME");
    }

  }

  return (
    <div className="Atm">
      <div className="atm-header">
        <img className="atm-sign" src="img/atm_sign.png" alt="ATM - 24 Hour Banking" />
        <img className="atm-sign-graffiti" src="img/graffiti.png" alt="" />
      </div>
      <div className="atm-body">
        <Cards activeCard={user ? user.card : null} />
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
