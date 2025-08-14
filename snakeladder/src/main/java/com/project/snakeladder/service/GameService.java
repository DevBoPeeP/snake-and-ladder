package com.project.snakeladder.service;

import com.project.snakeladder.dto.*;
import com.project.snakeladder.entity.Game;
import com.project.snakeladder.entity.Player;
import com.project.snakeladder.repository.GameRepository;
import com.project.snakeladder.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private Dice dice;

    @Autowired
    private Board board;

    private static final String[] COLORS = {"Red", "Blue", "Green", "Yellow", "Purple", "Orange"};

    public GameStateResponse createGame(CreateGameRequest request) {
        List<String> playerNames = request.getPlayerNames();

        if (playerNames.size() < 1 || playerNames.size() > 6) {
            throw new IllegalArgumentException("Number of players must be between 1 and 6");
        }

        // Create new game
        Game game = new Game();
        game = gameRepository.save(game);

        // Create players
        for (int i = 0; i < playerNames.size(); i++) {
            String playerName = playerNames.get(i);
            if (playerName == null || playerName.trim().isEmpty()) {
                throw new IllegalArgumentException("Player name cannot be empty");
            }

            Player player = new Player(playerName.trim(), COLORS[i], game);
            game.getPlayers().add(player);
            // Save each player to the repository
            playerRepository.save(player);
        }

        game = gameRepository.save(game);
        return buildGameStateResponse(game, "Game created successfully!");
    }

    public MoveResponse makeMove(MoveRequest request) {
        // Get the game
        Optional<Game> gameOpt = gameRepository.findById(request.getGameId());
        if (!gameOpt.isPresent()) {
            throw new IllegalArgumentException("Game not found");
        }

        Game game = gameOpt.get();

        // Check if game is still active
        if (game.getStatus() != Game.GameStatus.IN_PROGRESS) {
            throw new IllegalArgumentException("Game is not in progress");
        }

        // Get current player
        Player currentPlayer = game.getCurrentPlayer();
        if (currentPlayer == null) {
            throw new IllegalStateException("No current player found");
        }

        // Validate if it's the correct player's turn (if playerId is provided in request)
        if (request.getPlayerId() != null && !request.getPlayerId().equals(currentPlayer.getId())) {
            throw new IllegalArgumentException("It's not your turn");
        }

        int diceRoll = dice.roll(); // This is where the dice is rolled on the backend
        int previousPosition = currentPlayer.getPosition();
        int newPosition = previousPosition + diceRoll;

        MoveResponse response = new MoveResponse();
        response.setPlayerId(currentPlayer.getId());
        response.setPlayerName(currentPlayer.getName());
        response.setDiceRoll(diceRoll); // This sends the dice value to frontend

        // Check if move is valid (can't go beyond 100)
        if (newPosition > 100) {
            response.setNewPosition(previousPosition);
            response.setMessage(currentPlayer.getName() + " rolled " + diceRoll + " but can't move beyond position 100");
            game.nextTurn();
            gameRepository.save(game);
            return response;
        }

        currentPlayer.setPosition(newPosition);

        // Check for special positions (snakes/ladders)
        int finalPosition = board.checkSpecialPosition(newPosition);
        boolean hitSpecial = finalPosition != newPosition;

        if (hitSpecial) {
            currentPlayer.setPosition(finalPosition);
            response.setHitSpecialPosition(true);
            response.setSpecialPositionType(board.getSpecialPositionType(newPosition));
        }

        response.setNewPosition(finalPosition);

        // Check win condition
        if (board.checkWinCondition(finalPosition)) {
            game.setStatus(Game.GameStatus.FINISHED);
            game.setWinnerId(currentPlayer.getId());
            game.setFinishedAt(LocalDateTime.now());
            response.setGameWon(true);
            response.setMessage(currentPlayer.getName() + " has won the game!");
        } else {
            StringBuilder message = new StringBuilder();
            message.append(currentPlayer.getName()).append(" rolled ").append(diceRoll);
            message.append(" and moved to position ").append(finalPosition);

            if (hitSpecial) {
                if (response.getSpecialPositionType().equals("LADDER")) {
                    message.append(" (climbed a ladder!)");
                } else {
                    message.append(" (hit by a snake!)");
                }
            }

            response.setMessage(message.toString());
            game.nextTurn();
        }

        // Save the updated player position
        playerRepository.save(currentPlayer);
        gameRepository.save(game);
        return response;
    }

    public GameStateResponse getGameState(Long gameId) {
        Optional<Game> gameOpt = gameRepository.findById(gameId);

        if (!gameOpt.isPresent()) {
            throw new IllegalArgumentException("Game not found");
        }

        return buildGameStateResponse(gameOpt.get(), null);
    }

    public List<GameStateResponse> getAllGames() {
        return gameRepository.findAll().stream()
                .map(game -> buildGameStateResponse(game, null))
                .collect(Collectors.toList());
    }

    public List<GameStateResponse> getActiveGames() {
        return gameRepository.findActiveGames().stream()
                .map(game -> buildGameStateResponse(game, null))
                .collect(Collectors.toList());
    }

    private GameStateResponse buildGameStateResponse(Game game, String message) {
        GameStateResponse response = new GameStateResponse();
        response.setGameId(game.getId());
        response.setStatus(game.getStatus().toString());

        Player currentPlayer = game.getCurrentPlayer();
        if (currentPlayer != null) {
            response.setCurrentPlayerId(currentPlayer.getId());
            response.setCurrentPlayerName(currentPlayer.getName());
        }

        List<PlayerInfo> playerInfos = game.getPlayers().stream()
                .map(player -> new PlayerInfo(player.getId(), player.getName(),
                        player.getColor(), player.getPosition()))
                .collect(Collectors.toList());

        response.setPlayers(playerInfos);
        response.setMessage(message);

        // Add winner information if game is finished
        if (game.getStatus() == Game.GameStatus.FINISHED && game.getWinnerId() != null) {
            Optional<Player> winner = game.getPlayers().stream()
                    .filter(player -> player.getId().equals(game.getWinnerId()))
                    .findFirst();
            if (winner.isPresent()) {
                response.setWinnerName(winner.get().getName());
            }
        }

        return response;
    }
}