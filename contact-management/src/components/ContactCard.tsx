import React from "react";
import { useNavigate } from "react-router-dom";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactCardProps {
  contact: Contact;
  onDelete: () => void;
  token: string;
}

const ContactCard = ({ contact, onDelete, token }: ContactCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Add your desired behavior when the card is clicked

    navigate("/contact_detail", {
      state: {
        contactId: contact._id,
        bearerToken: token,
      },
    });
  };

  return (
    <div className="contact-card-container" onClick={() => handleCardClick()}>
      <li key={contact._id} className="contact-item">
        <strong>Name: </strong> {contact.name}
        <br />
        <strong>Email: </strong> {contact.email}
        <br />
        <strong>Phone: </strong> {contact.phone}
        <br />
      </li>
      <button
        onClick={(event) => {
          onDelete();
          event.stopPropagation();
        }}
        className="delete-button"
      >
        Delete
      </button>
    </div>
  );
};

export default ContactCard;
