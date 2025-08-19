const API_BASE_URL = "http://localhost:9187/snake-ladder-service/api/v1/games";

export const createGame = async (playerNames: string[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

export async function makeMove(gameId: number, playerId: number) {
  const res = await fetch(`${API_BASE_URL}/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId, playerId }), // matches MoveRequest fields
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}

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
