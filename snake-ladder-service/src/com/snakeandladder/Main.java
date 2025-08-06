package com.snakeandladder;

import com.snakeandladder.service.PlayService;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Welcome to the Dice Game!");
        System.out.print("Enter number of players (1-6): ");
        int playerCount = scanner.nextInt();
        scanner.nextLine(); // Consume newline

      PlayService playService = new PlayService();
        playService.startGame(playerCount);
        scanner.close();
    }
}