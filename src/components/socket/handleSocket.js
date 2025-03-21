import GameState from "../GameState";

export const handleConnectSocket = (setSocket, setIsUserConnected, setUserId, setTiles, setPlayerTurn, setGameState, setStrikeClass, setIsFriendConnected) => {
    const WS_URL =
        window.location.hostname === "localhost"
            ? "ws://localhost:8080/hello"  // Use localhost for local development
            : "ws://10.0.0.126:8080/hello"; // Use local network IP for mobile access

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        console.log('Connected to WebSocket');
        setIsUserConnected(true); // Update connection state

    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.action === "reset") {
                // Reset the game state on the other side
                setTiles(Array(9).fill(null));
                setPlayerTurn(data.playerTurn);
                setGameState(GameState.inProgress);
                setStrikeClass(null);
            }
            else if (data.action === "friendConnected") {
                setIsFriendConnected(true);
            }
            else if (data.action === "friendDisconnected") {
                setIsFriendConnected(false);
            }
            else {
                // Update the game state with the received data
                setTiles(data.tiles);
                setPlayerTurn(data.playerTurn);
                setGameState(data.gameState);
                setStrikeClass(data.strikeClass);
                setIsFriendConnected(data.isFriendConnected);
            }
        } catch (error) {
            setUserId(event.data);
        }
    };

    ws.onclose = () => {
        console.log('Disconnected from WebSocket');
    };

    setSocket(ws); // Store WebSocket instance
};
