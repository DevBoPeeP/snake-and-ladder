package com.project.snakeladder.dto;

public class PlayerInfo {
    private Long id;
    private String name;
    private String color;
    private int position;

    public PlayerInfo() {}

    public PlayerInfo(Long id, String name, String color, int position) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.position = position;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public int getPosition() { return position; }
    public void setPosition(int position) { this.position = position; }
}
