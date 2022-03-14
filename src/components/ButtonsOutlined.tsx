import { Button } from "@material-ui/core";
import { outlinedButton } from "../helpers/inlineStyles";

export const ButtonOutlined: React.FC<any> = (props) => {
  return <Button variant="outlined" fullWidth style={outlinedButton} {...props} />;
};
