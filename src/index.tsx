//--- Requirements for Example ATM System ---//

// The software to be designed will control a simulated automated teller machine (ATM)
// having a magnetic stripe reader for reading an ATM card, a keyboard and display for 
// interaction with the customer, a slot for depositing envelopes, a dispenser for cash 
// (in multiples of $20), a printer for printing customer receipts, and a key-operated 
// switch to allow an operator to start or stop the machine. 
// The ATM will communicate with the bank's computer over an appropriate communication link.
// (The software on the latter is not part of the requirements for this problem.)

// The ATM will service one customer at a time. 
// A customer will be required to insert an ATM card and enter a PIN,
// both of which will be sent to the bank for validation as part of each transaction. 
// The customer will then be able to perform one or more transactions. 
// The card will be retained in the machine until the customer indicates that he/she 
// desires no further transactions, at which point it will be returned - except as noted below.

// The ATM must be able to provide the following services to the customer:
// A customer must be able to make a cash withdrawl from any suitable account linked to the card,
//  in multiples of $20.00. Approval must be obtained from the bank before cash is dispensed.
// A customer must be able to make a deposit to any account linked to the card, 
//  consisting of cash and/or checks in an envelope. The customer will enter the amount 
//  of the deposit into the ATM, subject to manual verification when the envelope is 
//  removed from the machine by an operator. Approval must be obtained from the bank
//  before physically accepting the envelope.
// A customer must be able to make a transfer of money between any two accounts linked to the card.
// A customer must be able to make a balance inquiry of any account linked to the card.

// The ATM will communicate each transaction to the bank and obtain verification 
// that it was allowed by the bank. In the case of a cash withdrawl or deposit,
// a second message will be sent after the transaction has been physically completed
// (cash dispensed or envelope accepted).

// If the bank determines that the customer's PIN is invalid, the customer will be required
// to re-enter the PIN before a transaction can proceed. 
// If the customer is unable to successfully enter the PIN after three tries, 
// the card will be permanently retained by the machine, and the customer will have to 
// contact the bank to get it back.

// If a transaction fails for any reason other than an invalid PIN, 
// the ATM will display an explanation of the problem, and will then ask the customer 
// whether he/she wants to do another transaction.

// The ATM will provide the customer with a printed receipt for each successful transaction, 
// showing the date, time, machine location, type of transaction, account(s), amount, 
// and ending and available balance(s) of the affected account ("to" account for tranfers).

// The ATM will have a an operator panel with a key-operated switch 
// (located on the "inside the bank" side) that will allow an operator to start and stop
// the servicing of customers. When the switch is moved to the "off" position, 
// the machine will shut down, so that the operator may remove deposit envelopes 
// and reload the machine with cash, blank receipts, etc. 
// The operator will be required to verify and enter the total cash on hand before 
// starting the system from this panel.

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';

import { sampleAccounts } from './data/nineSampleAccounts'
import { saveUserIdbAsync } from './data/Users';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


// Load some sample accounts for testing
// TODO - remove later
sampleAccounts.forEach(account => {
  saveUserIdbAsync(account.CardNumber, account)
})
