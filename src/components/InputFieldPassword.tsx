import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";

export const InputFieldPassword: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      type="password"
      {...field}
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
