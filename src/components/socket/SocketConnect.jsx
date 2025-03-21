import React from "react";

const SocketConnection = ({ onConnect }) => {
  return (
    <div>
      <button onClick={onConnect} className="connect-button">
        Connect to WebSocket
      </button>
    </div>
  );
};

export default SocketConnection;
