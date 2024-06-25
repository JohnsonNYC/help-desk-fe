import React, { useState, useEffect } from "react";
import styled from "styled-components";

const statusDictionary = {
  0: { message: "New", color: "#007bff" },
  1: { message: "Pending", color: "#fd7e14" },
  2: { message: "Complete", color: "#28a745" },
};

const AnswerForm = ({ ticketData, handleReply }) => {
  const [updatedTicketData, setUpdatedTicketData] = useState(null);
  const { name, email, description, status } = updatedTicketData || {};

  const [response, setResponse] = useState("");

  const clearState = () => {
    setResponse("");
  };

  const handleStatusChange = (newStatus) => {
    if (status != newStatus)
      setUpdatedTicketData({ ...ticketData, status: newStatus });
  };

  useEffect(() => {
    setUpdatedTicketData(ticketData);
  }, [ticketData]);

  return (
    <Wrapper>
      <TicketDetails>
        <div>Ticket Details</div>
        <div>Submitted By: {name}</div>
        <div>Email: {email}</div>
        <div style={{ marginTop: "50px" }}>Issue Details: {description}</div>
      </TicketDetails>

      <StatusSelection>
        Status:
        <Pill
          onClick={() => handleStatusChange(0)}
          color={status == 0 ? statusDictionary[status]["color"] : "grey"}
        >
          New
        </Pill>
        <Pill
          onClick={() => handleStatusChange(1)}
          color={status == 1 ? statusDictionary[status]["color"] : "grey"}
        >
          In Progress
        </Pill>
        <Pill
          onClick={() => handleStatusChange(2)}
          color={status == 2 ? statusDictionary[status]["color"] : "grey"}
        >
          Complete
        </Pill>
      </StatusSelection>

      <TicketResponse
        onSubmit={(e) => handleReply(e, updatedTicketData, clearState)}
      >
        Email To: <Input>{email}</Input>
        <TextArea
          placeholder={`Reply to ${name}`}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
        <Button onClick={(e) => handleReply(e, updatedTicketData, clearState)}>
          Submit
        </Button>
      </TicketResponse>
    </Wrapper>
  );
};

export default AnswerForm;

const Pill = styled.div`
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  border-radius: 6px;
  padding: 5px 10px;

  cursor: pointer;
`;
const StatusSelection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > * {
    margin: 0 5px;
  }
`;
const Button = styled.button`
  border: 1px solid #b874e8;
  border-radius: 6px;
  background: #b874e8;
  color: white;
  min-width: fit-content;
  min-height: fit-content;
  width: 30%;
  height: 10%;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &:hover:enabled {
    scale: 1.2;
    transition: scale 100ms ease-in;
  }

  &:disabled {
    background: #560591;
    border: 1px solid #560591;
  }
`;
const Input = styled.div`
  border: 1px solid grey;
  border-radius: 6px;
  height: 20px;
  width: fit-content;
  padding: 5px;
  display: inline-block;
`;
const TicketResponse = styled.form`
  height: 50%;
`;
const TicketDetails = styled.div`
  height: 30%;
`;
const TextArea = styled.textarea`
  width: 90%;
  height: 50%;
  resize: none;
  margin-top: 10px;
  padding: 10px;
`;
const Wrapper = styled.div`
  height: 100%;
`;
