import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { isCardValid } from "../validation/validateCard";
import { isPinValid } from "../validation/validatePIN";
import { saveUserIdbAsync } from "../data/Users";
import { useCurrentUser, User } from "../data/currentUser";
import { isUnique } from "../validation/validateUnique";
import { assignUserAccount } from "../helpers/assignUserAccount";
import { Link } from "react-router-dom";

interface RegisterFormProps {
  setCurrentUser: (arg0: User) => void
  registerUser: MouseEventHandler<HTMLButtonElement> | undefined;
}

// TODO - Rebuild this Component completely

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const inputRef = useRef() as React.MutableRefObject<any>;
  const nameRef = useRef() as React.MutableRefObject<any>;
  const pinRef1 = useRef() as React.MutableRefObject<any>;
  const pinRef2 = useRef() as React.MutableRefObject<any>;

  const [cardNumber, setCardNumber] = useState("");
  const [pinNumber, setPinNumber] = useState("");

  let currentUser = useCurrentUser();

  const handleCardInput = (input: string) => {
    isCardValid(input) && isUnique(input) && setCardNumber(input);
  };

  const handlePinInput = (input: string) => {
    isPinValid(input) &&
      pinRef1.current.value === pinRef2.current.value &&
      setPinNumber(input);
  };

  useEffect(() => {
    cardNumber &&
      pinNumber &&
      saveUserIdbAsync(cardNumber, {
        CardNumber: cardNumber,
        Username: nameRef.current.value,
        PIN: pinNumber,
        Balance: 0,
      });
      assignUserAccount(cardNumber);
  }, [cardNumber, currentUser, pinNumber]);

  return (
    <>
      <h2>Please enter your card number and register a new PIN</h2>
      <form action="submit">
        <div>
          <input
            type="text"
            name="username"
            ref={nameRef}
            placeholder="Enter UserName"
          />
        </div>
        <div>
          <input
            type="text"
            name="cardnumber"
            ref={inputRef}
            maxLength={16}
            placeholder="Enter 16-digit Card Number"
            onChange={(e) => handleCardInput(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="Pin"
            maxLength={5}
            ref={pinRef1}
            placeholder="Enter 5-digit PIN"
            onChange={(e) => handlePinInput(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="retypePin"
            maxLength={5}
            ref={pinRef2}
            placeholder="Re-type PIN"
            onChange={(e) => handlePinInput(e.target.value)}
          />
      <Link to="/MainMenu">
            <button onClick={props.registerUser}>SUBMIT</button>
            </Link>
        </div>
      </form>
      <div>
        <h2>{cardNumber && `Card: ${cardNumber}`}</h2>
        <h2>{pinNumber && `PIN: is Valid`}</h2>
      </div>
      <div>
      <Link to="/">
          <button>RETURN</button>
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
