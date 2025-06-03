import instance from "../config/axios";
import authentication from "./authentication";

export interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginError {
  msg: string;
  categoria: string;
}

const loginuser = async (
  user: LoginCredentials,
): Promise<{ response?: any; status?: number; mensaje?: LoginError }> => {
  try {
    const { data, status } = await instance.post("/auth", user);
    const response = await authentication();
    localStorage.setItem("token", data.token);

    return { response, status };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { msg: string } } };
    const mensaje = {
      msg: err.response?.data?.msg || "Error",
      categoria: "error",
    };

    return { mensaje };
  }
};

export default loginuser;
