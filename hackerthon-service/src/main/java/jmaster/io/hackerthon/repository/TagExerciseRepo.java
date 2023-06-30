package jmaster.io.hackerthon.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jmaster.io.hackerthon.entity.ExamExercise;
import jmaster.io.hackerthon.entity.TagExercise;


@Repository
public interface TagExerciseRepo extends JpaRepository<TagExercise,Integer> {
    

}
