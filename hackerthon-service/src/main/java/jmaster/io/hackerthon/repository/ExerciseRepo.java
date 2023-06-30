package jmaster.io.hackerthon.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jmaster.io.hackerthon.entity.Exercise;

@Repository
public interface ExerciseRepo extends JpaRepository<Exercise,Integer> {
    @Query("SELECT ex FROM Exercise ex WHERE ex.title LIKE :title ")
    Page<Exercise> find(@Param("title") String value, Pageable pageable);
    
    @Query("SELECT ex FROM Exercise ex JOIN ex.category cate WHERE cate.id = :x")
	Page<Exercise> searchByCategoryId(@Param("x") int categoryId ,Pageable pageable);


}
