import "./App.css";
// import { FormComponent, FormValues } from "./components/Form";
// import { FormComponent } from "./components/Form";
// import {YupForm} from "./components/YupForm";
// import { ZodForm } from "./components/ZodForm";
// import { MuiForm } from "./components/MuiForm";
import CustomForm from "./components/CustomForm";

function App() {
  // const fetchInitialValues = async () => {
  //   const response = await fetch(
  //     "https://jsonplaceholder.typicode.com/users/1"
  //   );
  //   const data = await response.json();
  //   const formattedData: FormValues = {
  //     username: data.username,
  //     email: data.email,
  //     channel: data.website,
  //   };
  //   return formattedData
  // };

  return (
    <div>
      {/* <FormComponent initialValues={fetchInitialValues} /> */}
      {/* <FormComponent /> */}
      {/* <YupForm /> */}
      {/* <ZodForm/> */}
      {/* <MuiForm/> */}
      <CustomForm />
    </div>
  );
}

export default App;
