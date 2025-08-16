package com.project.snakeladder.dto;

import java.util.List;

public class GameStateResponse {
    private Long gameId;
    private String status;
    private Long currentPlayerId;
    private String currentPlayerName;
    private List<PlayerInfo> players;
    private String message;

    public GameStateResponse() {}

    // Getters and setters
    public Long getGameId() { return gameId; }
    public void setGameId(Long gameId) { this.gameId = gameId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getCurrentPlayerId() { return currentPlayerId; }
    public void setCurrentPlayerId(Long currentPlayerId) { this.currentPlayerId = currentPlayerId; }

    public String getCurrentPlayerName() { return currentPlayerName; }
    public void setCurrentPlayerName(String currentPlayerName) { this.currentPlayerName = currentPlayerName; }

    public List<PlayerInfo> getPlayers() { return players; }
    public void setPlayers(List<PlayerInfo> players) { this.players = players; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}