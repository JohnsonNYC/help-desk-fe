import React, { useState } from "react";
import { createTicket } from "../services/tickets.services";
import Link from "next/link";
import { User } from "lucide-react";
import TicketSubmission from "../components/TicketSubmission";

const errorMessages = {
  email: "Please enter a valid email address",
  name: "Please enter a valid name",
  description:
    "Please enter a description of your problem. We will get back to you shortly!",
};

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const resetState = () => {
    setName("");
    setEmail("");
    setDescription("");
    setError(null);
    setSuccess(null);
  };

  const verifyEmail = () => {
    // Email validation regex pattern
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      return true;
    }

    return false;
  };

  const validateForm = () => {
    if (!name || !name.length) {
      setError(errorMessages.name);
      return false;
    } else if (!verifyEmail() || !email.length) {
      setError(errorMessages.email);
      return false;
    } else if (!description || !description.length) {
      setError(errorMessages.description);
      return false;
    } else return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // if Email Validation fails, return early;
    if (!validateForm()) {
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

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
    <div className="sc-home__container">
      <Link href="/admin" className="sc-home-admin-button">
        <User /> Admin View
      </Link>
      <TicketSubmission
        onSubmit={onSubmit}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        description={description}
        setDescription={setDescription}
        error={error}
        success={success}
      />
    </div>
  );
};

export default Home;
