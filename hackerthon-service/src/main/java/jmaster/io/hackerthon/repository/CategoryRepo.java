package jmaster.io.hackerthon.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jmaster.io.hackerthon.entity.Category;


@Repository
public interface CategoryRepo extends JpaRepository<Category,Integer> {
    @Query("SELECT ex FROM Category ex WHERE ex.title LIKE :title ")
    Page<Category> find(@Param("title") String value, Pageable pageable);

}
