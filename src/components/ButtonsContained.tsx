import { Button } from "@material-ui/core";
import { containedButton } from "../helpers/inlineStyles";

export const ButtonPrim: React.FC<any> = (props) => {
  return <Button variant="contained" color="primary" fullWidth style={containedButton} {...props} />;
};

export const ButtonScnd: React.FC<any> = (props) => {
  return <Button variant="contained" color="secondary" fullWidth style={containedButton} {...props} />;
};
