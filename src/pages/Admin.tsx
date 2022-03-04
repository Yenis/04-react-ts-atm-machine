import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { transactionStore } from "../data/transactionStore";

const AdminMenu: React.FC = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    transactionStore.assignTotalCashAmountAsync();
  });

  return (
    <>
      <div>
        <h1>_admin_menu</h1>
      </div>
      <div>
        <Button onClick={() => navigateTo("/RegisterPage")}>
          REGISTER NEW USER
        </Button>
      </div>
      <div>
        <Button onClick={() => navigateTo("/ServicePage")}>SERVICE ATM</Button>
      </div>
      <div>
        <Button onClick={() => navigateTo("/")}>RETURN</Button>
      </div>
    </>
  );
};

export default AdminMenu;
