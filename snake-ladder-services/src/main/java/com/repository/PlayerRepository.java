package com.buildwithbo.snake_ladder_services.repository;

import com.snakeandladder.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Query("SELECT p FROM Player p WHERE p.game.id = :gameId")
    List<Player> findByGameId(@Param("gameId") Long gameId);
}
