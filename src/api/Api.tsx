import BigNumber from "bignumber.js";

export interface ApiResponse<Type> {
  success: boolean;
  error?: string;
  value?: Type;
}

export interface ApiCallback<Type> {
  (response: ApiResponse<Type>): void;
}

export interface User {
  token: string;
  name: string;
  card: string;
}

export interface Api {
  /**
   * Gets an auth token from the API.
   *
   * @param cardNumber - The card/account number
   * @param pin - The PIN
   * @param cb Callback for when the API call is done.
   *           Will be passed a response containing the user's info (including
   *           an auth token) on success, or one of the following errors:
   *           - CARD_INVALID
   *           - INCORRECT_PIN
   */
  authenticate(cardNumber: string, pin: string, cb: ApiCallback<User>): void;

  /**
   * Gets a customer's account balance.
   *
   * @param token - The auth token
   * @param cb Callback for when the API call is done.
   *           Will be passed a response containing the
   *           balance on success, or one of the following
   *           errors:
   *           - UNAUTHORIZED
   */
    getBalance(token: string, cb: ApiCallback<BigNumber>): void;

  /**
   * Withdraws an amount from the customer's account.
   *
   * @param token - The auth token
   * @param amount - The amount to withdraw
   * @param cb Callback for when the API call is done.
   *           Will be passed a response containing the new
   *           balance on success, or one of the following
   *           errors:
   *           - UNAUTHORIZED
   *           - INSUFFICIENT_FUNDS
   */
  withdraw(token: string, amount: BigNumber, cb: ApiCallback<BigNumber>): void;

  /**
   * Deposits an amount into the customer's account.
   *
   * @param token - The auth token
   * @param amount - The amount to deposit
   * @param cb Callback for when the API call is done.
   *           Will be passed a response containing the new
   *           balance on success, or one of the following
   *           errors:
   *           - UNAUTHORIZED
   */
  deposit(token: string, amount: BigNumber, cb: ApiCallback<BigNumber>): void;
}
