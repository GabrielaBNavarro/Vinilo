import axios from "axios";
import { ILogin } from "../types/login";

export const postLogin = async (values: ILogin) => {
  try {
    const response = await axios.post<{ token: string }>(
      "http://localhost:8080/api/auth/login",
      {
        user: values.user,
        password: values.password,
      }
    );
    localStorage.setItem("token", response.data.token);
    return;
  } catch (error) {
    console.error(error);
  }
};
