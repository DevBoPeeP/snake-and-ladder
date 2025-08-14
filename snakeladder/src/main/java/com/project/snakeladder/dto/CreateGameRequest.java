package com.project.snakeladder.dto;


import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public class CreateGameRequest {
    @NotEmpty(message = "Player names list cannot be empty")
    private List<String> playerNames;

    public CreateGameRequest() {}

    public List<String> getPlayerNames() {
        return playerNames;
    }

    public void setPlayerNames(List<String> playerNames) {
        this.playerNames = playerNames;
    }
}