import React, { useEffect, useState } from "react";
import { Contact, UpdateContactProps } from "../interface/contact.interface";
import { useLocation } from "react-router-dom";
import { getContactById, updateContact } from "../api/contact_api";

const ContactDetail = () => {
  const location = useLocation();
  const { contactId, bearerToken } = location.state;
  const [contact, setContact] = useState<Contact | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await getContactById(contactId, bearerToken);
        const contactData = response?.data; // Assuming the contact data is in the response data
        setContact(contactData);
        setName(contactData.name || "");
        setEmail(contactData.email || "");
        setPhone(contactData.phone || "");
      } catch (error) {
        console.log("Error fetching contact:", error);
      }
    };

    fetchContact();
  }, [contactId, bearerToken]);

  const handleUpdateContact = async (contactId: string) => {
    const updatedContactData: UpdateContactProps = {
      name,
      email,
      phone,
    };
    console.log(updatedContactData);

    try {
      await updateContact(contactId, bearerToken, updatedContactData);
      console.log("Contact updated successfully!");
      // You can add a success message or navigate back to the contact list, etc.
    } catch (error) {
      console.log("Error updating contact:", error);
      // You can display an error message to the user
    }
  };

  return (
    <div className="contact-info-container">
      <input
        type="text"
        className="info-item"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="info-item"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="info-item"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        className="update-button"
        onClick={() => handleUpdateContact(contactId)}
      >
        Update
      </button>
    </div>
  );
};

export default ContactDetail;
