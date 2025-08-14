package com.project.snakeladder.controller;


import com.project.snakeladder.dto.CreateGameRequest;
import com.project.snakeladder.dto.GameStateResponse;
import com.project.snakeladder.dto.MoveRequest;
import com.project.snakeladder.dto.MoveResponse;
import com.project.snakeladder.service.GameService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/games")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping
    public ResponseEntity<GameStateResponse> createGame(@Valid @RequestBody CreateGameRequest request) {
        try {
            GameStateResponse response = gameService.createGame(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/move")
    public ResponseEntity<MoveResponse> makeMove(@RequestBody MoveRequest request) {
        try {
            MoveResponse response = gameService.makeMove(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{gameId}")
    public ResponseEntity<GameStateResponse> getGameState(@PathVariable Long gameId) {
        try {
            GameStateResponse response = gameService.getGameState(gameId);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<GameStateResponse>> getAllGames() {
        List<GameStateResponse> games = gameService.getAllGames();
        return ResponseEntity.ok(games);
    }

    @GetMapping("/active")
    public ResponseEntity<List<GameStateResponse>> getActiveGames() {
        List<GameStateResponse> activeGames = gameService.getActiveGames();
        return ResponseEntity.ok(activeGames);
    }
}