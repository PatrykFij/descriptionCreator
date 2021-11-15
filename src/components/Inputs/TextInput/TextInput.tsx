import { Control, Controller, DeepMap, FieldError } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { helperText } from "utils/reactHookFormUtils";
import { registerMaxLength } from "utils/validators/textValidator";
import { ErrorLabel } from "../styles";

interface Props {
  required?: boolean;
  name: string;
  label: string;
  autoFocus?: boolean;
  control: Control<any>;
  errors: DeepMap<object, FieldError>;
  maxCharactersLength?: number;
  disabled?: boolean;
}

const TextInput = (props: Props) => {
  const required = props.required ? "*" : "";
  return (
    <div>
      <Controller
        defaultValue=""
        name={props.name}
        render={({ field: { name, onChange, value, onBlur } }) => (
          <TextField
            autoFocus={props.autoFocus}
            name={name}
            label={`${props.label}${required}`}
            onChange={(event) => {
              onChange(event.target.value);
            }}
            onBlur={onBlur}
            value={value || ""}
            size="small"
            margin={"dense"}
            fullWidth
            disabled={props.disabled}
          />
        )}
        control={props.control}
        rules={{
          required: props.required ? "This field is required" : undefined,
          ...registerMaxLength(props.maxCharactersLength ?? 100),
        }}
      />
      <ErrorLabel>{props.errors && helperText(props.name, props.errors)}</ErrorLabel>
    </div>
  );
};

export default TextInput;
