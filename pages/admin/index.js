import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Tile from "../../components/Tile";
import AnswerForm from "../../components/AnswerForm";
import Modal from "../../components/Modal";

import {
  getAllTickets,
  updateTicketStatus,
} from "../../services/tickets.services";

const AdminPage = ({ ticketsData }) => {
  const [tickets, setTickets] = useState(ticketsData);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const TICKETS = useMemo(() => {
    return tickets.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }, [tickets]);

  const fetchTickets = async () => {
    const response = await getAllTickets();

    if (response.status == 200) {
      setTickets(response.tickets);
    }
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };

  const handleReply = async (e, ticketData, onSuccess) => {
    e.preventDefault();
    let res = await updateTicketStatus(ticketData);
    if (res.status == 200) {
      if (typeof onSuccess == "function") onSuccess();
      fetchTickets();
    }
  };

  useEffect(() => {
    setIsModalOpen(Boolean(selectedTicket));
  }, [selectedTicket]);

  return (
    <div className="sc-admin-container">
      <Link href="/" className="sc-admin__submit-req">
        Submit A Request
      </Link>
      <div className="sc-admin-container__ticket-container">
        {TICKETS && TICKETS.length ? (
          TICKETS.map((ticket) => {
            return (
              <Tile
                key={ticket.ticket_id}
                ticketData={ticket}
                setSelectedTicket={setSelectedTicket}
              />
            );
          })
        ) : (
          <div className="sc-admin__empty-message">
            There are no tickets yet - head on over to the submit form using the
            button above to create a ticket!
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <AnswerForm ticketData={selectedTicket} handleReply={handleReply} />
      </Modal>
    </div>
  );
};

export default AdminPage;

export async function getServerSideProps() {
  const res = await getAllTickets();
  return { props: { ticketsData: res.tickets } };
}
