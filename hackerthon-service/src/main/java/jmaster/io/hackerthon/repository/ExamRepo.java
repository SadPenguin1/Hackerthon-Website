package jmaster.io.hackerthon.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jmaster.io.hackerthon.entity.Exam;


@Repository
public interface ExamRepo extends JpaRepository<Exam,Integer> {
    @Query("SELECT ex FROM Exam ex WHERE ex.title LIKE :title ")
    Page<Exam> find(@Param("title") String value, Pageable pageable);

}
