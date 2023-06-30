package jmaster.io.hackerthon.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jmaster.io.hackerthon.entity.Answer;
import jmaster.io.hackerthon.entity.User;


@Repository
public interface AnswerRepo extends JpaRepository<Answer,Integer> {
    @Query("SELECT a FROM Answer a WHERE a.userAnswer LIKE :userAnswer ")
    Page<Answer> find(@Param("userAnswer") String value, Pageable pageable);
    
    @Query("SELECT a FROM Answer a JOIN a.exercise ex WHERE ex.id = :x")
	Page<Answer> searchByExerciseId(@Param("x") Integer exerciseId ,Pageable pageable);
    
    @Query("SELECT a FROM Answer a JOIN a.user u WHERE u.id = :x")
	List<Answer> searchByUserId(@Param("x") Integer userId);
    
    @Query("SELECT a FROM Answer a WHERE a.user = :user_id")
    List<Answer> findByUser(@Param("user_id") User user);

}
