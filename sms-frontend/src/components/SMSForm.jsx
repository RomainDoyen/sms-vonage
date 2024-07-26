/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import './SMSForm.css';

const SMSForm = () => {
  const [fromNumber, setFromNumber] = useState('');
  const [toNumber, setToNumber] = useState('');
  const [textMessage, setTextMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/sendsms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromNumber,
          to: toNumber,
          text: textMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponseMessage(data.status_message);
    } catch (error) {
      console.error("Error submitting SMS:", error);
      setResponseMessage("Failed to send SMS.");
    }
  };

  return (
    <>
      <h1>Send SMS</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom de l'expéditeur <span className="obligatoire">*</span> :</label>
          <input
            type="text"
            value={fromNumber}
            onChange={(e) => setFromNumber(e.target.value)}
            placeholder='Ex: Dupont'
            required
          />
        </div>
        <div>
          <label>Vers le numéro <span className="obligatoire">*</span> :</label>
          <input
            type="text"
            value={toNumber}
            onChange={(e) => setToNumber(e.target.value)}
            placeholder='Ex: 33612345678'
            required
          />
        </div>
        <div>
          <label>Message <span className="obligatoire">*</span> :</label>
          <textarea
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder='Entrez votre message ici...'
            required
          />
        </div>
        <p className="obligatoire">* Champs obligatoires</p>
        <button type="submit">Envoyer</button>
      </form>
      {responseMessage ? (
        <p className="success">{responseMessage}</p>
      ) : (
        <p className="error">{responseMessage}</p>
      )}
    </>
  );
};

export default SMSForm;

