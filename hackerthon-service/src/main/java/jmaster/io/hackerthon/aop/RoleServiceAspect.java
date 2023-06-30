package jmaster.io.hackerthon.aop;

import jmaster.io.hackerthon.dto.RoleDTO;
import jmaster.io.hackerthon.entity.Role;
import jmaster.io.hackerthon.repository.RoleRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import javax.persistence.NoResultException;
import java.util.List;

@Aspect
@Component
public class RoleServiceAspect {
    @Autowired
    CacheManager cacheManager;
    @Autowired
    RoleRepo roleRepo;

    @Before("execution(* jmaster.io.hackerthon.service.RoleService.create(*))")
    public void create(JoinPoint joinPoint) {
        cacheManager.getCache(CacheNames.CACHE_ROLE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_ROLE).clear();
    }

    @Before("execution(* jmaster.io.hackerthon.service.RoleService.update(*))")
    public void update(JoinPoint joinPoint) {
        RoleDTO userRoleDTO = (RoleDTO) joinPoint.getArgs()[0];
        Role currentUser = roleRepo.findById(userRoleDTO.getId()).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_ROLE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_ROLE).evict(currentUser.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.RoleService.delete(*))")
    public void delete(JoinPoint joinPoint) {
        int id = (Integer) joinPoint.getArgs()[0];
        Role currentUser = roleRepo.findById(id).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_ROLE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_ROLE).evict(currentUser.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.RoleService.deleteByUserId(*))")
    public void deleteByUserId(JoinPoint joinPoint) {
        Integer id = (Integer) joinPoint.getArgs()[0];
        Role currentUser = roleRepo.findById(id).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_ROLE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_ROLE).evict(currentUser.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.RoleService.deleteAll(*))")
    public void deleteAll(JoinPoint joinPoint) {
        @SuppressWarnings("unchecked")
        List<Integer> ids = (List<Integer>) joinPoint.getArgs()[0];

        List<Role> roles = roleRepo.findAllById(ids);

        // clear cache
        roles.forEach(role -> {
            cacheManager.getCache(CacheNames.CACHE_ROLE).evict(role.getId());
        });
        cacheManager.getCache(CacheNames.CACHE_ROLE_FIND).clear();
    }
}
