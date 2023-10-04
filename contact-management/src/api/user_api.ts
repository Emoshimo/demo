import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api/users",
});

interface User {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (userData: User): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post("/register", userData);
    return response;
  } catch (err) {
    throw new Error("Error");
  }
};

interface LoginUser {
  email: string;
  password: string;
}

export const loginUser = async (loginData: LoginUser): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post("/login", loginData);
    return response;
  } catch (error) {
    throw new Error("Couldnt Logged in!");
  }
};

export const currentUser = async (token: string) => {
  const response: AxiosResponse = await api.get("/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response?.data) {
    return response.data;
  }
};
