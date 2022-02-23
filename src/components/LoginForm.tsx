import { useState } from "react";
import { allAccounts } from "../data/allAccountIDs";

interface LoginFormProps {
  handleLoginUser: (arg0: string, arg1: string) => void
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [cardInput, setCardInput] = useState("");
  const [pinInput, setPinInput] = useState("");

  const handleAccountSelect = (select: string) => {
    setCardInput(select);
  };

  return (
    <form action="submit">
      <input
        type="text"
        value={cardInput}
        maxLength={16}
        placeholder="16-digit Card Number"
        onChange={(e) => setCardInput(e.target.value)}
      />
      <select onChange={(e) => handleAccountSelect(e.target.value)}>
        {allAccounts.map((user) => {
          return <option key={user.cardNumber}>{user.cardNumber}</option>;
        })}
      </select>
      <div>
        <input
          type="password"
          value={pinInput}
          maxLength={5}
          placeholder="Enter 5-digit PIN"
          onChange={(e) => setPinInput(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            props.handleLoginUser(cardInput, pinInput);
          }}
        >
          LOGIN
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
