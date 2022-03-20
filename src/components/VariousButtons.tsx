import { Button } from "@material-ui/core";
import { containedButton, outlinedButton } from "../helpers/inlineStyles";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import AddCardIcon from "@mui/icons-material/AddCard";
import BuildIcon from "@mui/icons-material/Build";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const ButtonLang: React.FC<any> = (props) => {
  return <Button size="small" variant="contained" color="primary" {...props} />;
};

export const ButtonLogin: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      style={containedButton}
      startIcon={<LoginIcon />}
      {...props}
    />
  );
};

export const ButtonAdminMenu: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      style={containedButton}
      startIcon={<AdminPanelSettingsIcon />}
      {...props}
    />
  );
};

export const ButtonAdminLogin: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      style={containedButton}
      startIcon={<AdminPanelSettingsIcon />}
      {...props}
    />
  );
};

export const ButtonRegister: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      style={containedButton}
      startIcon={<AddCardIcon />}
      {...props}
    />
  );
};

export const ButtonService: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      style={containedButton}
      startIcon={<BuildIcon />}
      {...props}
    />
  );
};

export const ButtonPowerSetting: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      style={containedButton}
      startIcon={<PowerSettingsNewIcon />}
      {...props}
    />
  );
};

export const ButtonInsertCard: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      style={containedButton}
      startIcon={<CreditCardIcon />}
      {...props}
    />
  );
};

export const ButtonAccountStatus: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      style={containedButton}
      startIcon={<AccountBalanceWalletIcon />}
      {...props}
    />
  );
};

export const ButtonDeposit: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      style={containedButton}
      startIcon={<AttachMoneyIcon />}
      {...props}
    />
  );
};

export const ButtonWithdraw: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      style={containedButton}
      startIcon={<AttachMoneyIcon />}
      {...props}
    />
  );
};

export const ButtonSubmit: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      style={containedButton}
      startIcon={<CreditCardIcon />}
      {...props}
    />
  );
};

export const ButtonReturn: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      style={containedButton}
      startIcon={<KeyboardReturnIcon />}
      {...props}
    />
  );
};

export const ButtonReturnOut: React.FC<any> = (props) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      style={outlinedButton}
      startIcon={<KeyboardReturnIcon />}
      {...props}
    />
  );
};

export const ButtonLogout: React.FC<any> = (props) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      style={containedButton}
      startIcon={<LogoutIcon />}
      {...props}
    />
  );
};
