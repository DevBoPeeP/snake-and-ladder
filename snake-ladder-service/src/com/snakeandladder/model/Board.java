package com.snakeandladder.model;

import java.util.HashMap;
import java.util.Map;

public class Board {
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

    public static boolean checkWinCondition(int position) {
        return position >= WINNING_POSITION;
    }

    public static int checkSpecialPosition(int currentPosition) {
        return SPECIAL_POSITIONS.getOrDefault(currentPosition, currentPosition);
    }
}
