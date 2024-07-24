import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email format is not valid"),
  channel: z.string().min(1, "Channel is required"),
});

export type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const ZodForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    console.log("Form submitted values: ", values);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors: ", errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <div>
      <h1>Zod Form</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <button disabled={isSubmitting}>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
