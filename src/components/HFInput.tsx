import { FC } from "react";
import {
  //   useForm,
  //   useFieldArray,
//   FieldErrors,
  //   FieldValues,
//   UseFormRegister,
} from "react-hook-form";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  type: string;
  name: string;
  error?: string;
  label?: string;
  required?: string;
  defaultValue?:
    | {
        [x: string]: string | number | Date;
      }
    | undefined;
}

const HFInput: FC<Props> = ({
  register,
  error,
  type = "text",
  name,
  required,
  label,
  //   defaultValue,
}) => {
  //   const { register } = useForm({
  //     defaultValues: defaultValue,
  //   });
//   const error = errors?.name?.message;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        {...register(name, {
          required,
          valueAsNumber: type === "number",
          valueAsDate: type === "date",
        })}
      />
      <p className="error">{error as string}</p>
    </div>
  );
};

export default HFInput;
