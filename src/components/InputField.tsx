import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";

export const InputField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      fullWidth
      autoFocus
      helperText={errorText}
      error={!!errorText}
    />
  );
};
