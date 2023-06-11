import axios from "axios";

export const SignInok=(employee)=> {
  return axios.post("https://localhost:7208/api/EmployeeDetail/GetEmployeeLogin", employee)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
