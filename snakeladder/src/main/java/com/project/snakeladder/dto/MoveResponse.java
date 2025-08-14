package com.project.snakeladder.dto;

public class MoveResponse {
    private Long playerId;
    private String playerName;
    private int diceRoll;
    private int previousPosition;
    private int newPosition;
    private boolean hitSpecialPosition;
    private String specialPositionType;
    private boolean gameWon;
    private String message;

    public MoveResponse() {}

    // Getters and setters
    public Long getPlayerId() { return playerId; }
    public void setPlayerId(Long playerId) { this.playerId = playerId; }

    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }

    public int getDiceRoll() { return diceRoll; }
    public void setDiceRoll(int diceRoll) { this.diceRoll = diceRoll; }

    public int getPreviousPosition() { return previousPosition; }
    public void setPreviousPosition(int previousPosition) { this.previousPosition = previousPosition; }

    public int getNewPosition() { return newPosition; }
    public void setNewPosition(int newPosition) { this.newPosition = newPosition; }

    public boolean isHitSpecialPosition() { return hitSpecialPosition; }
    public void setHitSpecialPosition(boolean hitSpecialPosition) { this.hitSpecialPosition = hitSpecialPosition; }

    public String getSpecialPositionType() { return specialPositionType; }
    public void setSpecialPositionType(String specialPositionType) { this.specialPositionType = specialPositionType; }

    public boolean isGameWon() { return gameWon; }
    public void setGameWon(boolean gameWon) { this.gameWon = gameWon; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
