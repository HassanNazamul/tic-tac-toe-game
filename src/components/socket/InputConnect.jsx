import React, { useState } from "react";

const ConnectInput = ({ onConnect }) => {
  const [friendId, setFriendId] = useState("");

  const handleConnectClick = () => {
    if (friendId.trim()) {
      // Format the message and send it to the parent
      const formattedMessage = `connect:${friendId}`;
      onConnect(formattedMessage); // Pass the formatted message to the parent
      console.log(`Connecting to: ${formattedMessage}`);
    }
  };

  return (
    <div className="custom-input-button">
      <input
        type="text"
        placeholder="Enter Friend User Id"
        value={friendId}
        onChange={(e) => setFriendId(e.target.value)} // Update the state as the user types
      />
      <button onClick={handleConnectClick}>Connect</button>
    </div>
  );
};

export default ConnectInput;
