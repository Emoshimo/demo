import React, { useEffect, useState } from "react";
import useCreateContact from "../hooks/useCreateContact";
import useContacts from "../hooks/useContacts";

const CreateContacts = ({ accessToken }: { accessToken: string }) => {
  const { createContact, isLoading, error } = useCreateContact(accessToken);
  const { contacts, setContacts, fetchContacts } = useContacts(accessToken);
  const [isAvaiable, setAvaiable] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleToggleContactForm = () => {
    setAvaiable(!isAvaiable);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  const resetContactData = () => {
    setContactData({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleCreateContact = async () => {
    console.log(contactData);
    resetContactData();

    const createdContact = await createContact(contactData);
    if (createdContact) {
      await fetchContacts();
      setContacts((contacts) => [...contacts, createdContact]);
      setAvaiable(false);
    }
  };

  return (
    <div>
      <button onClick={handleToggleContactForm} className="new-contact-button">
        New Contact
      </button>
      {isAvaiable && (
        <div className="overlay">
          <button onClick={handleToggleContactForm} className="close-button">
            X
          </button>
          <div className="create-contact-container">
            <h2 className="create-contact-header">Create Contact</h2>
            <input
              className="input-field"
              type="text"
              placeholder="Name"
              name="name"
              value={contactData.name}
              onChange={handleInputChange}
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              name="email"
              value={contactData.email}
              onChange={handleInputChange}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Phone"
              name="phone"
              value={contactData.phone}
              onChange={handleInputChange}
            />
            <button
              className="create-contact-button"
              onClick={handleCreateContact}
            >
              Create Contact
            </button>
            {error && <div className="error-message">{error?.message}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContacts;
