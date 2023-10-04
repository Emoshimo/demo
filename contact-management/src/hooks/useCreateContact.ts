import axios from "axios";
import React, { useState } from "react";

const useCreateContact = (accessToken: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  interface ContactData {
    name: string;
    email: string;
    phone: string;
  }

  const createContact = async (contactData: ContactData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Make API call to create the contact using contactData
      const response = await axios.post(
        "http://localhost:5001/api/contacts",
        contactData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Handle the response if needed
      console.log("Contact created:", response.data.contact);
      return response.data.contact;
    } catch (err) {
      setError(err as Error);
      console.error("Error creating contact:", err as Error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createContact, isLoading, error };
};

export default useCreateContact;
