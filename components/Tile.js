import React from "react";
import styled from "styled-components";
import { formatTimestamp } from "../utils/date.utils";

const statusDictionary = {
  0: { message: "New", color: "#007bff" },
  1: { message: "In Progress", color: "#fd7e14" },
  2: { message: "Complete", color: "#28a745" },
};

const Tile = ({ ticketData, setSelectedTicket }) => {
  const { name, description, status, created_at } = ticketData;

  return (
    <TileContainer onClick={() => setSelectedTicket(ticketData)}>
      <div>
        <Title>Description:</Title> {description}
      </div>
      <div>
        <Title>Submitted By:</Title> {name}
      </div>
      <Date>{formatTimestamp(created_at)}</Date>
      <StatusText textcolor={statusDictionary[status]["color"]}>
        {statusDictionary[status]["message"]}
      </StatusText>
    </TileContainer>
  );
};

const Date = styled.div`
  font-size: 14px;
`;
const Title = styled.div`
  font-weight: 600;
  font-family; monospace;
  display: inline-block; 
`;
const TileContainer = styled.div`
  border: 1px solid grey;
  border-radius: 6px;
  margin-bottom: 20px;
  min-height: 40px;
  padding: 10px;
  position: relative;
  cursor: pointer;

  & > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:nth-child(2) {
      margin-top: 20px;
    }
  }

  &:hover {
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
    transform: translate(10px, 0);
    transition: transform 200ms ease-in;
  }
`;

const StatusText = styled.div`
  border: 1px solid ${(props) => props.textcolor};
  color: ${(props) => props.textcolor};
  font-family: monospace;
  border-radius: 6px;
  width: fit-content;
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 5px;
`;

export default Tile;
