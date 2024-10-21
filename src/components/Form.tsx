import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { EmailValidate } from "./Validate";
import { useEffect } from "react";

export type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dateOfBirth: Date;
};

let count = 0;

export const FormComponent = ({
  initialValues,
}: {
  initialValues?: () => Promise<FormValues>;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState,
    reset,
    watch,
    getValues,
    setValue,
    trigger,
  } = useForm<FormValues>({
    defaultValues: {
      username: "Iron Man",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [
        {
          number: "",
        },
      ],
      age: undefined,
      dateOfBirth: new Date(),
    },
    // mode: "onBlur",
    mode: "onTouched",
    // defaultValues: initialValues,
  });
  // const { name, ref, onChange, onBlur } = register("username");

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  // console.log("touched-dirty: ", {
  //   touchedFields,
  //   dirtyFields,
  //   isDirty,
  //   isValid,
  // });
  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (values: FormValues) => {
    console.log("Form submitted values: ", values);
    // reset();
  };

  // const watchUsername = watch("username");
  // const watchUsernameEmail = watch(["username", "email"]);
  // const watchForm = watch();

  // useEffect(() => {
  //   console.log("useeffect");
  //   const subscription = watch((value) => {
  //     console.log("value: ", value);
  //   });
  //   return subscription.unsubscribe();
  // }, [watch]);

  const handleGetValues = () => {
    console.log("Get Values: ", getValues());
    console.log("Get Values-social: ", getValues("social"));
    console.log("Get Values-social-twit: ", getValues("social.twitter"));
    console.log("Get Values-array: ", getValues(["username", "age"]));
  };

  const handleSetValue = () => {
    // setValue("username", "as", {
    setValue("username", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors: ", errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  count++;
  return (
    <div>
      <h1>YouTube Form ({count / 2}) </h1>x
      {/* <h2>Watch value: {watchUsername}</h2> */}
      {/* <h2>Watch value: {watchUsernameEmail}</h2> */}
      {/* <h2>Watch value: {JSON.stringify(watchForm)}</h2> */}
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            // name={name}
            // ref={ref}
            // onChange={onChange}
            // onBlur={onBlur}
            {...register("username", { required: "Username is required" })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
              // validate: (fieldValue) => {
              //   return (
              //     fieldValue !== "admin@example.com" ||
              //     "Enter a different email address"
              //   );
              // },
              // validate: {
              //   notAdmin: (fieldValue) => {
              //     return (
              //       fieldValue !== "admin@example.com" ||
              //       "Enter a different email address"
              //     );
              //   },
              //   notBlackListed: (fieldValue) => {
              //     return (
              //       !fieldValue.endsWith("baddomain.com") ||
              //       "This domain is not supperted"
              //     );
              //   },
              // },
              validate: EmailValidate,
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        {/*//! nested object */}
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              disabled: watch("channel") === "",
              required: {
                value: true,
                message: "Twitter is required",
              },
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>
        {/* //! arrays */}
        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "Phone1 is required",
              },
            })}
          />
          <p className="error">
            {errors?.phoneNumbers && errors?.phoneNumbers[0]?.message}
          </p>
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>
        {/* //! useFieldArray */}
        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number`, {
                      required: { value: true, message: "Not empty" },
                    })}
                  />
                  <p className="error">
                    {errors?.phNumbers &&
                      errors?.phNumbers[index]?.number?.message}
                  </p>
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>
        {/* //! Number */}
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true, //! This is true
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        {/* //! Date */}
        <div className="form-control">
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            type="date"
            id="dateOfBirth"
            {...register("dateOfBirth", {
              valueAsDate: true, //! This is true
              required: {
                value: true,
                message: "Date of birth is required",
              },
            })}
          />
          <p className="error">{errors.dateOfBirth?.message}</p>
        </div>
        {/* <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button> */}
        <button disabled={!isDirty || isSubmitting}>Submit</button>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set Value
        </button>
        {/* <button type="button" onClick={() => trigger()}> */}
        <button type="button" onClick={() => trigger("email")}>
          Validate
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
