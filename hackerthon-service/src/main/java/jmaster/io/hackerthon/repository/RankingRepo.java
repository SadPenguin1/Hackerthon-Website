package jmaster.io.hackerthon.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jmaster.io.hackerthon.entity.Answer;
import jmaster.io.hackerthon.entity.Ranking;

@Repository
public interface RankingRepo extends JpaRepository<Ranking,Integer> {
//    @Query("SELECT c FROM RankingsRankings c  where c.score like :score ")
//    Page<Rankings> find(@Param("score") String s, Pageable pageable);
//    
//    @Query("SELECT s FROM Score s JOIN s.answer a JOIN a.user u WHERE u.id = :x")
//   	Page<Score> searchByUserId(@Param("x") Integer userId ,Pageable pageable);
    
//    @Query("SELECT s FROM Score s JOIN s.answer a JOIN a.excercise ex WHERE ex.id = :x")
//   	Page<Score> searchByExcerciseId(@Param("x") Integer exerciseId ,Pageable pageable);

//    @Modifying
//    @Query("delete from Score c where c.course.id = :cid")
//     void deleteByCourseId(@Param("cid") int courseId);
}
