import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "animate.css";

const Modal = ({ children, isOpen, handleClose }) => {
  const [animationText, setAnimationText] = useState("animate__fadeInRight");

  return (
    <Container isopen={isOpen ? "inline" : "none"}>
      <Wrapper className={`animate__animated ${animationText}`}>
        <Button onClick={handleClose}>X</Button>
        {children}
      </Wrapper>
    </Container>
  );
};

export default Modal;

const Button = styled.button`
  display: block;
  cursor: pointer;
  color: grey;
  border: none;
  background: none;
  padding: 4px;
`;
const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  height: 100%;
  width: 100%;

  display: ${(props) => props.isopen};
`;

const Wrapper = styled.div`
  width: 80%;
  height: 90%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: white;
  border-radius: 6px;
  padding: 10px;
`;
