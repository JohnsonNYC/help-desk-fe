import React, { useState, useEffect } from "react";
import { User, Mail, CircleAlert } from "lucide-react";

const AnswerForm = ({ ticketData, handleReply }) => {
  const [updatedTicketData, setUpdatedTicketData] = useState(null);
  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [successClassName, setSuccessClassName] = useState(
    "animate__fadeOutRightBig"
  );

  const { name, email, description, status } = updatedTicketData || {};

  const onSuccess = (type) => {
    setResponse("");
    setSuccessClassName("animate__fadeInRightBig");

    if (type == "status") {
      setSuccess("Succesfully Updated Ticket Status!");
    } else {
      setSuccess("Succesfully Responded To This Ticket!");
    }

    setTimeout(() => {
      setSuccessClassName(" animate__fadeOutRightBig");
    }, 4000);

    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  };

  const handleStatusChange = (e, newStatus) => {
    if (status == newStatus) return;
    setUpdatedTicketData({ ...updatedTicketData, status: newStatus });
    handleReply(
      e,
      { ...updatedTicketData, status: newStatus },
      onSuccess("status")
    );
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!response || !response.length) {
      setError("Please enter your reply");

      setTimeout(() => {
        setError(null);
      }, 4000);

      return;
    }
    handleReply(e, updatedTicketData, onSuccess);
  };

  useEffect(() => {
    setUpdatedTicketData(ticketData);
  }, [ticketData]);

  return (
    <div className="sc-answer-form__container">
      {success ? (
        <div
          className={`sc-answer-form__success-token animate__animated ${successClassName}`}
        >
          {success}
        </div>
      ) : null}

      <div style={{ height: "30%" }}>
        <div className="sc-answer-form__helvetica" style={{ fontSize: "32px" }}>
          "{description}"
        </div>
        <div className="sc-answer-form__user-details">
          <div className="sc-answer-form__round-wrapper">
            <User size={16} />
          </div>
          <div>
            <span
              style={{ fontSize: "16px" }}
              className="sc-answer-form__helvetica"
            >
              {name}
            </span>
            <div
              style={{ fontSize: "14px" }}
              className="sc-answer-form__helvetica"
            >
              {email}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "50%" }} onSubmit={(e) => submitForm(e)}>
        <div className="sc-answer-form__header">
          <div className="sc-answer-form__input">
            <Mail size={20} />
            {email}
          </div>

          <div className="sc-answer-form__status-selection">
            Ticket Status:
            <div
              className={`sc-answer-form__pill ${
                status == 0 ? "sc-answer-form__pill--new" : ""
              }`}
              onClick={(e) => handleStatusChange(e, 0)}
            >
              New
            </div>
            <div
              className={`sc-answer-form__pill ${
                status == 1 ? "sc-answer-form__pill--in-progress" : ""
              }`}
              onClick={(e) => handleStatusChange(e, 1)}
            >
              In Progress
            </div>
            <div
              className={`sc-answer-form__pill ${
                status == 2 ? "sc-answer-form__pill--complete" : ""
              }`}
              onClick={(e) => handleStatusChange(e, 2)}
            >
              Complete
            </div>
          </div>
        </div>
        <textarea
          placeholder={`Reply to ${name}`}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className="sc-answer-form__textarea"
        />
        {error ? (
          <div className="sc-answer-form__error-token">
            <CircleAlert /> {error}
          </div>
        ) : null}
        <button className="sc-answer-form_btn" onClick={(e) => submitForm(e)}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AnswerForm;
