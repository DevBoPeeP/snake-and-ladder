package com.snakeandladder.service;

import com.snakeandladder.model.Board;
import com.snakeandladder.model.Player;

import java.util.List;

public class MovementService {
    private List<Player> players;
    private int currentPlayerIndex;

    public MovementService(List<Player> players) {
        this.players = players;
        this.currentPlayerIndex = 0;
    }

    public Player getCurrentPlayer() {
        return players.get(currentPlayerIndex);
    }

    public void nextTurn() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.size();
    }

    public void processMove(Player player, int diceRoll) {
        int newPosition = player.getPosition() + diceRoll;

        if (newPosition > 100) {
            return; // Player can't move beyond 100
        }

        player.setPosition(newPosition);
        player.setPosition(Board.checkSpecialPosition(newPosition));

        if (Board.checkWinCondition(player.getPosition())) {
            System.out.println(player.getName() + " (" + player.getColor() + ") has won the game!");
            System.out.println("Thank you for playing!");
            System.exit(0);

        }
    }
}

