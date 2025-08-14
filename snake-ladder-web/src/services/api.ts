const API_BASE_URL = "http://localhost:9187/snake-ladder-service/v1/games";

export const createGame = async (playerNames: string[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerNames }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
};

export const makeMove = async (gameId: number, playerId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId, playerId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error making move:", error);
    throw error;
  }
};

export const getGameState = async (gameId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${gameId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching game state:", error);
    throw error;
  }
};
