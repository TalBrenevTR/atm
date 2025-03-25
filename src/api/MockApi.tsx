import BigNumber from "bignumber.js";
import { Api, User } from "./Api";

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
      setProperty("1111111111", "card", "star");
      setProperty("1111111111", "pin", "1234");
      setProperty("1111111111", "balance", "500.66");

      setProperty("2222222222", "name", "John Doe");
      setProperty("2222222222", "card", "pulse");
      setProperty("2222222222", "pin", "2345");
      setProperty("2222222222", "balance", "1423.78");

      setProperty("3333333333", "name", "Jane Doe");
      setProperty("3333333333", "card", "maestro");
      setProperty("3333333333", "pin", "3456");
      setProperty("3333333333", "balance", "3000.00");

      setProperty("4444444444", "name", "Frodo Baggins");
      setProperty("4444444444", "card", "mastercard");
      setProperty("4444444444", "pin", "4567");
      setProperty("4444444444", "balance", "10000000.00");

      setProperty("5555555555", "name", "Samwise Gamgee");
      setProperty("5555555555", "card", "plus");
      setProperty("5555555555", "pin", "5678");
      setProperty("5555555555", "balance", "100.23");

      setProperty("6666666666", "name", "Aragorn");
      setProperty("6666666666", "card", "visa");
      setProperty("6666666666", "pin", "6789");
      setProperty("6666666666", "balance", "0.27");
    }
  }

  public authenticate(cardNumber: string,
                      pin: string,
                      onSuccess: (user: User) => void,
                      onFailure: (error: string) => void,
                      onComplete?: () => void) {
    setTimeout(() => {
      let correctPin = getProperty(cardNumber, "pin");
      if (!correctPin) {
        onFailure("CARD_INVALID");
      }
      else if (pin !== correctPin) {
        onFailure("INCORRECT_PIN");
      }
      else {
        onSuccess({
          token: cardNumber,
          name: getProperty(cardNumber, "name") as string,
          card: getProperty(cardNumber, "card") as string
        });
      }
      if (onComplete) {
        onComplete();
      }
    }, apiDelay);
  }

  public getBalance(token: string,
                    onSuccess: (balance: BigNumber) => void,
                    onFailure: (error: string) => void,
                    onComplete?: () => void) {
    setTimeout(() => {
      let balance = getProperty(token, "balance");
      if (!balance) {
        onFailure("UNAUTHORIZED");
      }
      else {
        onSuccess(BigNumber(balance));
      }
      if (onComplete) {
        onComplete();
      }
    }, apiDelay);
  }

  public withdraw(token: string,
                  amount: BigNumber,
                  onSuccess: (balance: BigNumber) => void,
                  onFailure: (error: string) => void,
                  onComplete?: () => void) {
    setTimeout(() => {
      let balance = getProperty(token, "balance");
      if (!balance) {
        onFailure("UNAUTHORIZED");
      }
      else if (amount.isGreaterThan(balance)) {
        onFailure("INSUFFICIENT_FUNDS");
      }
      else {
        let newBalance = BigNumber(balance).minus(amount);
        setProperty(token, "balance", newBalance.toString());
        onSuccess(newBalance);
      }
      if (onComplete) {
        onComplete();
      }
    }, apiDelay);
  }

  public deposit(token: string,
                 amount: BigNumber,
                 onSuccess: (balance: BigNumber) => void,
                 onFailure: (error: string) => void,
                 onComplete?: () => void) {
    setTimeout(() => {
      let balance = getProperty(token, "balance");
      if (!balance) {
        onFailure("UNAUTHORIZED");
      }
      else {
        let newBalance = BigNumber(balance).plus(amount);
        setProperty(token, "balance", newBalance.toString());
        onSuccess(newBalance);
      }
      if (onComplete) {
        onComplete();
      }
    }, apiDelay);
  }
}
