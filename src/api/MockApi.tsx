import BigNumber from "bignumber.js";
import { Api, ApiCallback, User } from "./Api";

let apiDelay = 1000;

function getProperty(cardNumber: string, property: string): string | null {
  return window.localStorage.getItem("mockapi.user." + cardNumber + "." + property);
}

function setProperty(cardNumber: string, property: string, value: string) {
  window.localStorage.setItem("mockapi.user." + cardNumber + "." + property, value);
}

export class MockApi implements Api {
  constructor() {
    if (!window.localStorage.getItem("mockapi.setup")) {
      window.localStorage.setItem("mockapi.setup", "yes");

      setProperty("1111111111", "name", "Peter Parker");
      setProperty("1111111111", "card", "STAR");
      setProperty("1111111111", "pin", "1234");
      setProperty("1111111111", "balance", "500.66");

      setProperty("2222222222", "name", "John Doe");
      setProperty("2222222222", "card", "VISA");
      setProperty("2222222222", "pin", "2345");
      setProperty("2222222222", "balance", "1423.78");

      setProperty("3333333333", "name", "Jane Doe");
      setProperty("2222222222", "card", "MAESTRO");
      setProperty("3333333333", "pin", "3456");
      setProperty("3333333333", "balance", "0");
    }
  }

  public authenticate(cardNumber: string, pin: string, cb: ApiCallback<User>) {
    setTimeout(() => {
      let correctPin = getProperty(cardNumber, "pin");
      if (!correctPin) {
        cb({success: false, error: 'CARD_INVALID'});
      }
      else if (pin !== correctPin) {
        cb({success: false, error: 'INCORRECT_PIN'});
      }
      else {
        cb({success: true,
            value: {
                token: cardNumber,
                name: getProperty(cardNumber, "name") as string,
                card: getProperty(cardNumber, "card") as string
              }});
      }
    }, apiDelay);
  }

  public getBalance(token: string, cb: ApiCallback<BigNumber>) {
    setTimeout(() => {
      let balance = getProperty(token, "balance");
      if (!balance) {
        cb({success: false, error: 'UNAUTHORIZED'});
      }
      else {
        cb({success: true, value: BigNumber(balance)});
      }
    }, apiDelay);
  }

  public withdraw(token: string, amount: BigNumber, cb: ApiCallback<BigNumber>) {
    setTimeout(() => {
      let balance = getProperty(token, "balance");
      if (!balance) {
        cb({success: false, error: 'UNAUTHORIZED'});
      }
      else if (amount.isGreaterThan(balance)) {
        cb({success: false, error: 'INSUFFICIENT_FUNDS'});
      }
      else {
        let newBalance = BigNumber(balance).minus(amount);
        setProperty(token, "balance", newBalance.toString());
        cb({success: true, value: newBalance});
      }
    }, apiDelay);
  }

  public deposit(token: string, amount: BigNumber, cb: ApiCallback<BigNumber>) {
    setTimeout(() => {
      let balance = getProperty(token, "balance");
      if (!balance) {
        cb({success: false, error: 'UNAUTHORIZED'});
      }
      else {
        let newBalance = BigNumber(balance).plus(amount);
        setProperty(token, "balance", newBalance.toString());
        cb({success: true, value: newBalance});
      }
    }, apiDelay);
  }
}
