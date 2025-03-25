import BigNumber from "bignumber.js";

export interface User {
  token: string;
  name: string;
  card: string;
}

export interface Api {
  /**
   * Gets an auth token from the API.
   *
   * @param cardNumber The card/account number
   * @param pin The PIN
   * @param onSuccess Callback for if the API call is successful. Will be passed
   *                  a response containing the user's info (including an auth token).
   * @param onFailure Callback for if the API call resulted in an error. Will be passed
   *                  one of the following error codes:
   *                  - CARD_INVALID
   *                  - INCORRECT_PIN
   * @param onComplete Callback for when the API call finishes, regardless of success
   *                   or failure. This will be called after onSuccess/onFailure.
   */
  authenticate(cardNumber: string,
               pin: string,
               onSuccess: (user: User) => void,
               onFailure: (error: string) => void,
               onComplete?: () => void): void;

  /**
   * Gets a customer's account balance.
   *
   * @param token The auth token
   * @param onSuccess Callback for if the API call is successful. Will be passed
   *                  a response containing balance.
   * @param onFailure Callback for if the API call resulted in an error. Will be passed
   *                  one of the following error codes:
   *                  - UNAUTHORIZED
   * @param onComplete Callback for when the API call finishes, regardless of success
   *                   or failure. This will be called after onSuccess/onFailure.
   */
   getBalance(token: string,
              onSuccess: (balance: BigNumber) => void,
              onFailure: (error: string) => void,
              onComplete?: () => void): void;

  /**
   * Withdraws an amount from the customer's account.
   *
   * @param token The auth token
   * @param amount The amount to withdraw
   * @param onSuccess Callback for if the API call is successful. Will be passed
   *                  a response containing the new balance.
   * @param onFailure Callback for if the API call resulted in an error. Will be passed
   *                  one of the following error codes:
   *                  - UNAUTHORIZED
   *                  - INSUFFICIENT_FUNDS
   * @param onComplete Callback for when the API call finishes, regardless of success
   *                   or failure. This will be called after onSuccess/onFailure.
   */
  withdraw(token: string,
           amount: BigNumber,
           onSuccess: (balance: BigNumber) => void,
           onFailure: (error: string) => void,
           onComplete?: () => void): void;

  /**
   * Deposits an amount into the customer's account.
   *
   * @param token The auth token
   * @param amount The amount to deposit
   * @param onSuccess Callback for if the API call is successful. Will be passed
   *                  a response containing the new balance.
   * @param onFailure Callback for if the API call resulted in an error. Will be passed
   *                  one of the following error codes:
   *                  - UNAUTHORIZED
   * @param onComplete Callback for when the API call finishes, regardless of success
   *                   or failure. This will be called after onSuccess/onFailure.
   */
  deposit(token: string,
          amount: BigNumber,
          onSuccess: (balance: BigNumber) => void,
          onFailure: (error: string) => void,
          onComplete?: () => void): void;
}
