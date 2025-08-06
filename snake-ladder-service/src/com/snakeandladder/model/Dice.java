package com.snakeandladder.model;

import java.security.SecureRandom;

public class Dice {
    private static final SecureRandom secureRandom = new SecureRandom();

    public static int roll() {
        return secureRandom.nextInt(6) + 1; // Returns 1 to 6
    }
}
