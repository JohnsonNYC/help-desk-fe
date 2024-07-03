import React from "react";
import { formatTimestamp } from "../utils/date.utils";

const statusDictionary = {
  0: { message: "New", color: "#007bff", alias: "new" },
  1: { message: "In Progress", color: "#fd7e14", alias: "in-progress" },
  2: { message: "Complete", color: "#28a745", alias: "complete" },
};

const Tile = ({ ticketData, setSelectedTicket }) => {
  const { name, description, status, created_at } = ticketData;

  return (
    <div
      className="sc-tile__container"
      onClick={() => setSelectedTicket(ticketData)}
    >
      <div>{description}</div>
      <div>
        <div className="sc-tile__title">Submitted By:</div> {name}
      </div>
      <div style={{ fontSize: "14px" }}>{formatTimestamp(created_at)}</div>
      <div
        className={`sc-title__status sc-title__status--${statusDictionary[status]["alias"]}`}
        textcolor={statusDictionary[status]["color"]}
      >
        {statusDictionary[status]["message"]}
      </div>
    </div>
  );
};

export default Tile;
