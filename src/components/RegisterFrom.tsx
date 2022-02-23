import { useState } from "react";

interface RegisterFormProps {
  handleRegisterUser: (arg0: string, arg1: string, arg2: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const [userName, setUserName] = useState("");
  const [cardInput, setCardInput] = useState("");
  const [pinInput, setPinInput] = useState("");

  return (
    <form action="submit">
      <input
        type="text"
        value={userName}
        placeholder="UserName"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        value={cardInput}
        maxLength={16}
        placeholder="16-digit Card Number"
        onChange={(e) => setCardInput(e.target.value)}
      />
      <input
        type="password"
        maxLength={5}
        value={pinInput}
        placeholder="Enter 5-digit PIN"
        onChange={(e) => setPinInput(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          props.handleRegisterUser(userName, cardInput, pinInput);
        }}
      >
        REGISTER USER
      </button>
    </form>
  );
};

export default RegisterForm;
