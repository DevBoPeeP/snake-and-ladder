package com.buildwithbo.snake_ladder_services.repository;

import com.snakeandladder.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    @Query("SELECT g FROM Game g WHERE g.status = 'ACTIVE'")
    List<Game> findActiveGames();

    @Query("SELECT g FROM Game g WHERE g.status = 'FINISHED'")
    List<Game> findFinishedGames();
}
