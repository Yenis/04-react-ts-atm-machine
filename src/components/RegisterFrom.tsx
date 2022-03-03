interface RegisterFormProps {
  userName: string | number | readonly string[] | undefined;
  setUserName: (arg0: string) => void;
  cardInput: string | number | readonly string[] | undefined;
  setCardInput: (arg0: string) => void;
  pinInput: string | number | readonly string[] | undefined;
  setPinInput: (arg0: string) => void;
  handleRegisterUser: (arg0: string, arg1: string, arg2: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  return (
    <form action="submit">
      <input
        type="text"
        value={props.userName}
        placeholder="UserName"
        onChange={(e) => props.setUserName(e.target.value)}
      />
      <input
        type="text"
        value={props.cardInput}
        maxLength={16}
        placeholder="16-digit Card Number"
        onChange={(e) => props.setCardInput(e.target.value)}
      />
      <input
        type="password"
        maxLength={5}
        value={props.pinInput}
        placeholder="Enter 5-digit PIN"
        onChange={(e) => props.setPinInput(e.target.value)}
      />
    </form>
  );
};

export default RegisterForm;
