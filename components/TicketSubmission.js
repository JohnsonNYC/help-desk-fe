import React from "react";

const TicketSubmission = ({
  name,
  setName,
  email,
  setEmail,
  description,
  setDescription,
  error,
  success,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="sc-home__form-container">
      <h1 className="sc-home__header">Create a new Ticket</h1>
      <input
        className="sc-home__input"
        placeholder={"Enter Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="sc-home__input"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <textarea
        className="sc-home__text-area"
        placeholder="Please describe your problem and someone will get back to you shortly"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error ? <div className="sc-home__error-message">{error}</div> : null}
      {success ? (
        <div className="sc-home__success-message">
          Succesfully submitted! We'll get back to you shortly
        </div>
      ) : (
        <button className="sc-home__submit-btn" onClick={onSubmit}>
          Submit
        </button>
      )}
    </form>
  );
};

export default TicketSubmission;
