package com.project.snakeladder.service;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class Dice {
    private static final SecureRandom secureRandom = new SecureRandom();

    public int roll() {
        return secureRandom.nextInt(6) + 1; // Returns 1 to 6
    }
}
