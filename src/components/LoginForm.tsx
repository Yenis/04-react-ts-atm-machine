import { userStore } from "../data/userStore";

interface LoginFormProps {
  cardInput: string | number | readonly string[] | undefined;
  setCardInput: (arg0: string) => void;
  pinInput: string | number | readonly string[] | undefined;
  setPinInput: (arg0: string) => void;
  handleLoginUser: (arg0: string, arg1: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const handleAccountSelect = (select: string) => {
    props.setCardInput(select);
  };

  return (
    <form action="submit">
      <input
        type="text"
        value={props.cardInput}
        maxLength={16}
        placeholder="16-digit Card Number"
        onChange={(e) => props.setCardInput(e.target.value)}
      />

      <select onChange={(e) => handleAccountSelect(e.target.value)}>
        {userStore.usersData.map((user) => {
          return <option key={user.cardNumber}>{user.cardNumber}</option>;
        })}
      </select>

      <div>
        <input
          type="password"
          value={props.pinInput}
          maxLength={5}
          placeholder="Enter 5-digit PIN"
          onChange={(e) => props.setPinInput(e.target.value)}
        />
      </div>
    </form>
  );
};

export default LoginForm;
