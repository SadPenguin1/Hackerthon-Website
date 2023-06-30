package jmaster.io.hackerthon.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jmaster.io.hackerthon.entity.Exam;
import jmaster.io.hackerthon.entity.Tag;


@Repository
public interface TagRepo extends JpaRepository<Tag,Integer> {
    @Query("SELECT ex FROM Tag ex WHERE ex.title LIKE :title ")
    Page<Tag> find(@Param("title") String value, Pageable pageable);

}
