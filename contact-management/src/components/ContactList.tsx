import React, { useEffect, useState } from "react";
import useContacts from "../hooks/useContacts";
import ContactCard from "./ContactCard";
import { deleteContact } from "../api/contact_api";
import { NONAME } from "dns";
import CreateContacts from "./CreateContacts";

const ContactList = ({ accessToken }: { accessToken: string }) => {
  const { contacts, fetchContacts } = useContacts(accessToken);
  const [contactList, setContactList] = useState(contacts);

  const handleDeleteContact = async (contactId: string) => {
    const response = await deleteContact(contactId, accessToken);

    console.log("response", response);
    setContactList(contactList.filter((contact) => contact._id !== contactId));
  };

  useEffect(() => {
    fetchContacts();
  }, [contactList]);

  return (
    <div className="contact-container">
      <div className="contact-list-header">
        <h2>My Contacts</h2>
        <CreateContacts accessToken={accessToken} />
      </div>
      <div className="contact-list">
        {contacts.length > 0 ? (
          contacts.map((c) => (
            <ContactCard
              key={c._id}
              contact={c}
              onDelete={() => handleDeleteContact(c._id)}
              token={accessToken}
            />
          ))
        ) : (
          <li style={{ listStyle: "none" }} className="no-contacts-message">
            You don't have any contacts.
          </li>
        )}
      </div>
    </div>
  );
};

export default ContactList;
