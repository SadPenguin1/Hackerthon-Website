package jmaster.io.hackerthon.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import jmaster.io.hackerthon.dto.SolutionDTO;
import jmaster.io.hackerthon.entity.Solution;
import jmaster.io.hackerthon.repository.SolutionRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.List;

@Aspect
@Component
public class SolutionServiceAspect {
    @Autowired
    CacheManager cacheManager;

    @Autowired
    SolutionRepo solutionRepo;

    @Before("execution(* jmaster.io.hackerthon.service.SolutionService.create(*))")
    public void create(JoinPoint joinPoint) {
        cacheManager.getCache(CacheNames.CACHE_SOLUTION_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_SOLUTION).clear();
    }

    @Before("execution(* jmaster.io.hackerthon.service.SolutionService.update(*))")
    public void update(JoinPoint joinPoint) {
        SolutionDTO solutionDTO = (SolutionDTO) joinPoint.getArgs()[0];
        Solution solution = solutionRepo.findById(solutionDTO.getId()).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_SOLUTION_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_SOLUTION).evict(solution.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.SolutionService.delete(*))")
    public void delete(JoinPoint joinPoint) {
        int id = (Integer) joinPoint.getArgs()[0];
        Solution solution = solutionRepo.findById(id).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_SOLUTION_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_SOLUTION).evict(solution.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.SolutionService.deleteAll(*))")
    public void deleteAll(JoinPoint joinPoint) {
        @SuppressWarnings("unchecked")
        List<Integer> ids = (List<Integer>) joinPoint.getArgs()[0];

        List<Solution> solutions = solutionRepo.findAllById(ids);

        // clear cache
        solutions.forEach(solution -> {
            cacheManager.getCache(CacheNames.CACHE_SOLUTION).evict(solution.getId());
        });
        cacheManager.getCache(CacheNames.CACHE_SOLUTION_FIND).clear();
    }
}
