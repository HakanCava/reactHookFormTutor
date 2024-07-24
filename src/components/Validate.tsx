export const EmailValidate = {
  notAdmin: (fieldValue: string) => {
    return (
      fieldValue !== "admin@example.com" || "Enter a different email address"
    );
  },
  notBlackListed: (fieldValue: string) => {
    return (
      !fieldValue.endsWith("baddomain.com") || "This domain is not supperted"
    );
  },
  emailAvailable: async (fieldValue: string) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
    );
    const data = await response.json();
    console.log("data: ",data)
    return data.length == 0 || "Email already exists";
  },
};
