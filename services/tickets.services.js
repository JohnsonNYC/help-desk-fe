const url = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getAllTickets = async () => {
  try {
    const response = await fetch(`${url}/tickets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const tickets = await response.json();
    return tickets;
  } catch (e) {
    return { error: e };
  }
};

export const createTicket = async (ticketData) => {
  try {
    const response = await fetch(`${url}/tickets`, {
      method: "POST",
      body: JSON.stringify(ticketData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const ticket = await response.json();
    return ticket;
  } catch (e) {
    return { error: e };
  }
};

export const updateTicketStatus = async (ticketData) => {
  const { ticket_id } = ticketData || {};

  try {
    const response = await fetch(`${url}/tickets/${ticket_id}`, {
      method: "PUT",
      body: JSON.stringify(ticketData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    const ticket = await response.json();
    return ticket;
  } catch (e) {
    return { error: e };
  }
};
