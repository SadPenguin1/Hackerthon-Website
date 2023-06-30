package jmaster.io.hackerthon.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jmaster.io.hackerthon.entity.Solution;

@Repository
public interface SolutionRepo extends JpaRepository<Solution,Integer> {
    @Query("SELECT ex FROM Solution ex WHERE ex.content LIKE :content ")
    Page<Solution> find(@Param("content") String value, Pageable pageable);
    
    @Query("SELECT ex FROM Solution ex JOIN ex.exercise cate WHERE cate.id = :x")
	Page<Solution> searchByExcerciseId(@Param("x") int exerciseId ,Pageable pageable);


}
