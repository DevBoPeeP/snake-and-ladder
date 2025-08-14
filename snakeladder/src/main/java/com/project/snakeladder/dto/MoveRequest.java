package com.project.snakeladder.dto;

import jakarta.validation.constraints.Min;

public class MoveRequest {
    @Min(value = 1, message = "Game ID must be positive")
    private Long gameId;
    private Long playerId;

    public MoveRequest() {}

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }
}

