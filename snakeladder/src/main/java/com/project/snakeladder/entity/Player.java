package com.project.snakeladder.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Setter;

@Entity
@Table(name = "players")
public class Player {

    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Player name is required")
    @Column(name = "name", nullable = false)
    private String name;

    @Setter
    @Column(name = "color")
    private String color;

    @Setter
    @Column(name = "position")
    private int position;

    @Setter
    @ManyToOne
    @JoinColumn(name = "game_id")
    @JsonIgnore
    private Game game;

    // Constructors
    public Player() {
        this.position = 0;
    }

    public Player(String name, String color) {
        if (name == null || !name.matches("^[A-Za-z]+$")) {
            throw new IllegalArgumentException("Name must contain only letters with no spaces or special characters.");
        }
        this.name = name;
        this.color = color;
        this.position = 0; // Default position
    }

    public Player(String name, String color, Game game) {
        this(name, color);
        this.game = game;
    }



    ;
    // Getters


    public Long getId() {
        return this.id;
    }
public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name != null ? name.trim() : null;
    }

    public String getColor() {
        return this.color;
    }
    public void setColor(String color) {
        this.color = color;
    }

    public int getPosition() {
        return this.position;
    }
    public void setPosition(int position) {
        this.position = position;
    }

    public Game getGame() {
        return this.game;
    }
    public void setGame(Game game) {
        this.game = game;
    }


}

