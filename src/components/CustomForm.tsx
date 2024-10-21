import React from "react";
import { useForm } from "react-hook-form";
import HFInput from "./HFInput";
import { DevTool } from "@hookform/devtools";
import InputError from "./InputError";

type FormValues = {
  cityname: string;
  population: number;
  date: Date;
};

const CustomForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    // defaultValues: defaultValue,
  });
  const onSubmit = (data: FormValues) => {
    console.log("data: ", data);
  };
  return (
    <div>
      <h1>CustomForm</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputError
          input={
            <HFInput
              register={register}
              type="text"
              name="cityname"
              required="cityname is required"
            />
          }
          error={errors.cityname?.message}
        />
        <HFInput
          register={register}
          name="population"
          type="number"
          required="population is required"
          error={errors.population?.message}
        />
        <HFInput register={register} name="date" type="date" />
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default CustomForm;
