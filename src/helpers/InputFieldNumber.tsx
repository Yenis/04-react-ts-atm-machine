import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";

export const InputFieldNumber: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      type="number"
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
