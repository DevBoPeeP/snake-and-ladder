package com.snakeandladder.service;

import com.snakeandladder.model.Dice;
import com.snakeandladder.model.Player;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class PlayService {

    public void startGame(int playerCount) {

        // Initialize game components, players, and board
        Scanner scanner = new Scanner(System.in);
        System.out.println("Starting the Snake and Ladder game...");
        if (playerCount < 1 || playerCount > 6) {
            System.out.println("Invalid number of players. Exiting...");
            System.exit(0);
        }

        List<Player> players = new ArrayList<>();
        String[] colors = {"Red", "Blue", "Green", "Yellow", "Purple", "Orange"};

        for (int i = 0; i < playerCount; i++) {
            System.out.print("Enter name for Player " + (i + 1) + ": ");
            String name = scanner.nextLine();
            players.add(new Player(name, colors[i]));
        }

        MovementService game = new MovementService(players);

        System.out.println("\nGame started! Press Enter to roll the dice.");

        while (true) {
            Player currentPlayer = game.getCurrentPlayer();
            System.out.printf("\n%s's turn (%s - Position: %d)%n",
                    currentPlayer.getName(),
                    currentPlayer.getColor(),
                    currentPlayer.getPosition());

            System.out.print("Press Enter to roll...");
            scanner.nextLine();

            int roll = Dice.roll();
            System.out.println("You rolled: " + roll);

            game.processMove(currentPlayer, roll);
            System.out.printf("%s moved to position %d%n",
                    currentPlayer.getName(),
                    currentPlayer.getPosition());
            game.nextTurn();
        }

    }
}
