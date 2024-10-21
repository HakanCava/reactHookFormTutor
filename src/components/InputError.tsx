import React, { FC, ReactNode } from "react";

type Props = {
  input: ReactNode;
  error?: string;
};
const InputError: FC<Props> = ({ input, error }) => {
  return (
    <div>
      {input}
      <p className="error">{error}</p>
    </div>
  );
};

export default InputError;
