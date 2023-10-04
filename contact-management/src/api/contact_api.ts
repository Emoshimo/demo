import axios from "axios";
import { UpdateContactProps } from "../interface/contact.interface";

const api = axios.create({
  baseURL: "http://localhost:5001/api/contacts/",
});

export const deleteContact = async (id: string, token: string) => {
  console.log(id);
  console.log(token);

  try {
    const response = await api.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getContactById = async (id: string, token: string) => {
  try {
    const response = await api.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = async (
  id: string,
  token: string,
  updateContact: UpdateContactProps
) => {
  try {
    const response = await api.put(`/${id}`, updateContact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
