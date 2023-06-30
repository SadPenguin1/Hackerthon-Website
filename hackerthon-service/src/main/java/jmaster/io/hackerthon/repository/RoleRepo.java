package jmaster.io.hackerthon.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jmaster.io.hackerthon.entity.Role;


public interface RoleRepo extends JpaRepository<Role,Integer> {
   //     Optional<Role> findByName(String username); 

        @Query("SELECT u FROM Role u WHERE u.role LIKE :x ")
        Page<Role> searchByName(@Param("x") String s, Pageable pageable);
        
        @Modifying
        @Query("delete from Role r where r.user.id = :uid")
        public void deleteByUserId(@Param("uid") int id);
}