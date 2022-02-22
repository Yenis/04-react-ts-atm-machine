import { MouseEventHandler, useRef } from "react";
import { isCardValid } from "../validation/validateCard";
import { isPinValid } from "../validation/validatePIN";
import { allUserKeys } from "../data/allAccountIDs";
import { assignUserAccount } from "../helpers/assignUserAccount";
import { Link } from "react-router-dom";
import { User } from "../data/currentUser";

interface LoginFormProps {
  setCurrentUser: (arg0: User) => void;
  loginUser: MouseEventHandler<HTMLButtonElement> | undefined;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {

  const cardRef = useRef() as React.MutableRefObject<any>;
  const pinRef = useRef() as React.MutableRefObject<any>;

  const handleLogin = (input: string) => {
    isCardValid(input) &&
      assignUserAccount(input).then((result) => {
        props.setCurrentUser({ ...result });
      });
  };

  const handleAccountSelect = (e: { target: { value: string; }; }) => {
    cardRef.current.value = e.target.value;
    handleLogin(e.target.value)
  };

  return (
    <>
      <h2>Please Provide your card number and PIN</h2>
      <form action="submit">
        <input
          type="text"
          ref={cardRef}
          maxLength={16}
          placeholder="16-digit Card Number"
          onChange={(e) => handleLogin(e.target.value)}
        />
        <select onChange={handleAccountSelect}>
          {allUserKeys.map((user) => {
            return (
              <option
                key={`${user}`}
                value={user.CardNumber}
              >{`${user}`}</option>
            );
          })}
        </select>
        <div>
          <input
            type="password"
            maxLength={5}
            ref={pinRef}
            placeholder="Enter 5-digit PIN"
            onChange={(e) => isPinValid(e.target.value)}
          />
          <Link to="/MainMenu">
            <button onClick={props.loginUser}>LOGIN</button>
          </Link>
        </div>
      </form>
      <div>
        <Link to="/">
          <button>RETURN</button>
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
