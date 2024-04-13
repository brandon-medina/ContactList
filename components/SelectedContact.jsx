import { useEffect, useState } from 'react';

export default function SelectedContact({ contactId, setSelectedContactId }) {
  const [contact, setContact] = useState(null);
  
  useEffect(() => {
    const fetchContactById = async () => {
      try {
        const response = await fetch(`https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${contactId}`);
        const result = await response.json();
        setContact(result);
      } catch (error) {
        console.error("Failed to fetch contact", error);
      }
    };

    if (contactId) {
      fetchContactById(contactId);
    }
  }, [contactId]);
  
  return (
    <div>
      {contact ? (
        <div>
          <h2>{contact.name}</h2>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone ? contact.phone : "N/A"}</p>
          {/* Adding additional details from fetched data */}
          <p>Username: {contact.username}</p>
          <p>Website: {contact.website}</p>
          <p>Company: {contact.company?.name}</p>
          <button onClick={() => setSelectedContactId(null)}>Back to List</button>
        </div>
      ) : (
        <p>No contact selected</p>
      )}
    </div>
  );
}