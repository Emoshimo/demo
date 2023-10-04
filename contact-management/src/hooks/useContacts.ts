import React, { useEffect, useState } from "react";
import axios from "axios";
import { Contact } from "../interface/contact.interface";

const useContacts = (accessToken: string) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async (): Promise<Contact[] | any> => {
    try {
      const response = await axios.get("http://localhost:5001/api/contacts/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response?.data) {
        setContacts(response.data);
      }
    } catch (error) {
      console.error("Error fetching contacts", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [accessToken, contacts]);

  return { contacts, setContacts, fetchContacts };
};

export default useContacts;
