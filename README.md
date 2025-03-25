# ATM

## Requirements

The app was tested with the following, though it should work for other browsers/OSes:
- npm v10.9.0
- NodeJS v23.3.0
- Google Chrome v134
- macOS v13.7.4

## Running the App

Simply run:

```
npm start
```

and open [http://localhost:3000](http://localhost:3000) in the browser.

## Mock Data

The API is mocked out using LocalStorage as a "backend", and it will be
preloaded with sample data the first time you open the app in the browser.
Updates to the data will persist, even if you close and open the page.

The initial data is described in the table below:

| Card Number | Name           | PIN  | Card       | Balance     |
| ----------- | -------------- | ---- | ---------- | ----------- |
| 1111111111  | Peter Parker   | 1234 | star       | 500.66      |
| 2222222222  | John Doe       | 2345 | pulse      | 1423.78     |
| 3333333333  | Jane Doe       | 3456 | maestro    | 3000.00     |
| 4444444444  | Frodo Baggins  | 4567 | mastercard | 10000000.00 |
| 5555555555  | Samwise Gamgee | 5678 | plus       | 100.23      |
| 6666666666  | Aragorn        | 6789 | visa       | 0.27        |

## Using the ATM

You will first need to select a card to "insert".
You can do this by entering a card number from the mock data above.

The ATM will prompt you for a PIN. Enter the matching PIN from the mock data
above, by using the keypad on the ATM, and pressing the "Submit" button.

You should now be on the main menu of the ATM. You can interact with it
by pressing the buttons on either side of the "screen".
