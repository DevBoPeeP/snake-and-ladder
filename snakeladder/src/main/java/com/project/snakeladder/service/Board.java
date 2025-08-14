package com.project.snakeladder.service;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class Board {
Environment environment;
    private static final int WINNING_POSITION = 100;
    private static final Map<Integer, Integer> SPECIAL_POSITIONS = new HashMap<>();

    static {
        // Ladders
        SPECIAL_POSITIONS.put(2, 23);
        SPECIAL_POSITIONS.put(8, 34);
        SPECIAL_POSITIONS.put(20, 77);
        SPECIAL_POSITIONS.put(32, 68);
        SPECIAL_POSITIONS.put(41, 79);
        SPECIAL_POSITIONS.put(74, 88);
        SPECIAL_POSITIONS.put(82, 100);
        SPECIAL_POSITIONS.put(85, 95);

        // Snakes
        SPECIAL_POSITIONS.put(29, 9);
        SPECIAL_POSITIONS.put(38, 15);
        SPECIAL_POSITIONS.put(47, 5);
        SPECIAL_POSITIONS.put(53, 33);
        SPECIAL_POSITIONS.put(62, 37);
        SPECIAL_POSITIONS.put(86, 54);
        SPECIAL_POSITIONS.put(92, 70);
        SPECIAL_POSITIONS.put(97, 25);
    }

    public boolean checkWinCondition(int position) {
        return position >= WINNING_POSITION;
    }

    public int checkSpecialPosition(int currentPosition) {
        return SPECIAL_POSITIONS.getOrDefault(currentPosition, currentPosition);
    }

    public boolean isLadder(int position) {
        return SPECIAL_POSITIONS.containsKey(position) && SPECIAL_POSITIONS.get(position) > position;
    }

    public boolean isSnake(int position) {
        return SPECIAL_POSITIONS.containsKey(position) && SPECIAL_POSITIONS.get(position) < position;
    }

    public String getSpecialPositionType(int position) {
        if (isLadder(position)) {
            return "LADDER";
        } else if (isSnake(position)) {
            return "SNAKE";
        }
        return null;
    }
}