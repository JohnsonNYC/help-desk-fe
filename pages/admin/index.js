import React, { useState, useEffect } from "react";
import Link from "next/link";
import Tile from "../../components/Tile";
import AnswerForm from "../../components/AnswerForm";
import Modal from "../../components/Modal";
import styled from "styled-components";

import {
  getAllTickets,
  updateTicketStatus,
} from "../../services/tickets.services";

const AdminPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTickets = async () => {
    const response = await getAllTickets();

    if (response.status == 200) {
      setTickets(response.tickets);
    }
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };

  const handleReply = async (e, ticketData, callback) => {
    e.preventDefault();
    const { name } = ticketData || {};
    let res = await updateTicketStatus(ticketData);
    if (res.status == 200) {
      callback();
      fetchTickets();
      window.alert(`We will send ${name} an email with their updated ticket!`);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    setIsModalOpen(Boolean(selectedTicket));
  }, [selectedTicket]);

  return (
    <Wrapper>
      <StyledLink href="/">Submit A Request</StyledLink>
      <TicketsContainer>
        {tickets && tickets.length ? (
          tickets.map((ticket) => {
            return (
              <Tile
                key={ticket.ticket_id}
                ticketData={ticket}
                setSelectedTicket={setSelectedTicket}
              />
            );
          })
        ) : (
          <EmptyMessage>
            There are no tickets yet - head on over to the submit form using the
            button above to create a ticket!
          </EmptyMessage>
        )}
      </TicketsContainer>

      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <AnswerForm ticketData={selectedTicket} handleReply={handleReply} />
      </Modal>
    </Wrapper>
  );
};

export default AdminPage;

const EmptyMessage = styled.div`
  font-family: monospace;
  text-align: center;
`;
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TicketsContainer = styled.div`
  width: 40%;

  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;

const StyledLink = styled(Link)`
  margin-bottom: 20px;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 6px;
  padding: 5px;
  color: grey;

  &:hover {
    scale: 1.1;
    transition: scale 300ms ease-in;
  }
`;
