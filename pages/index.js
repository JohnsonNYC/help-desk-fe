import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createTicket } from "../services/tickets.services";
import Link from "next/link";
import { User } from "lucide-react";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const canSubmitBool = Boolean(
    name.length && email.length && description.length
  );

  const resetState = () => {
    setName("");
    setEmail("");
    setDescription("");
    setError(null);
    setSuccess(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      description,
    };

    try {
      let response = await createTicket(data);

      if (response.status == 200) {
        setSuccess("Your request has been succesfully!");
        setTimeout(() => {
          resetState();
        }, 5000);
      } else {
        // If Error
        setError("Please try again after a few minutes - thank you!");
        setTimeout(() => {
          resetState();
        }, 5000);
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Wrapper>
      <StyledLink href="/admin">
        <User /> Admin View
      </StyledLink>
      <Form onSubmit={onSubmit}>
        <Input
          placeholder={"Enter Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextArea
          placeholder="Please describe your problem and someone will get back to you shortly"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {success ? (
          <SuccessToken>Success!</SuccessToken>
        ) : error ? (
          <ErrorToken>{error}</ErrorToken>
        ) : (
          <Button disabled={!canSubmitBool} onClick={onSubmit}>
            Submit
          </Button>
        )}
      </Form>
    </Wrapper>
  );
};

export default Home;

const StyledLink = styled(Link)`
  border: 2px solid grey;
  border-radius: 6px;
  min-width: fit-content;
  min-height: fit-content;
  height: 20px;
  padding: 5px;
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
`;

const ErrorToken = styled.div`
  min-width: fit-content;
  min-height: fit-content;
  height: 5%;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff0033;
  border-radius: 10px;
  color: white;
  padding: 5px;
`;
const SuccessToken = styled.div`
  min-width: fit-content;
  min-height: fit-content;
  height: 5%;
  width: 20%;
  background: #4bb543;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: white;
  padding: 5px;
`;

const Button = styled.button`
  border: 1px solid #b874e8;
  border-radius: 6px;
  background: #b874e8;
  color: white;
  min-width: fit-content;
  min-height: fit-content;
  width: 30%;
  height: 8%;
  cursor: pointer;

  &:hover:enabled {
    scale: 1.2;
    transition: scale 100ms ease-in;
  }

  &:disabled {
    background: #560591;
    border: 1px solid #560591;
  }
`;

const TextArea = styled.textarea`
  width: 70%;
  height: 70%;
  resize: none;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 6px;
  margin-bottom: 10px;
`;
const Input = styled.input`
  border: 1px solid grey;
  border-radius: 6px;

  height: 30px;
  width: 70%;

  margin-bottom: 10px;
  padding: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 50%;
  padding: 10px;
`;
