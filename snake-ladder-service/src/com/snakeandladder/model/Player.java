package com.snakeandladder.model;

            import java.util.Scanner;

            public class Player {
                private final String name;
                private final String color;
                private int position;

                public Player(String name, String color) {
                    Scanner scanner = new Scanner(System.in);
                    String validName = name;

                    while (validName == null || validName.trim().isEmpty()) {
                        System.out.print("Please enter a valid name: ");
                        validName = scanner.nextLine();
                    }

                    this.name = validName.trim();
                    this.color = color;
                    this.position = 0;
                }

                public String getName() {
                    return name;
                }

                public String getColor() {
                    return color;
                }

                public int getPosition() {
                    return position;
                }

                public void setPosition(int position) {
                    this.position = position;
                }

                public void move(int steps) {
                    this.position += steps;
                }
            }