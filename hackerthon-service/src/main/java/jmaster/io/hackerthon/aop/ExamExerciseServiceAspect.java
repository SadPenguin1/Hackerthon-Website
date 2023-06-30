package jmaster.io.hackerthon.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import jmaster.io.hackerthon.dto.ExamExerciseDTO;
import jmaster.io.hackerthon.entity.ExamExercise;
import jmaster.io.hackerthon.repository.ExamExerciseRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.List;

@Aspect
@Component
public class ExamExerciseServiceAspect {
    @Autowired
    CacheManager cacheManager;

    @Autowired
    ExamExerciseRepo examExerciseRepo;

    @Before("execution(* jmaster.io.hackerthon.service.ExamExerciseService.create(*))")
    public void create(JoinPoint joinPoint) {
        cacheManager.getCache(CacheNames.CACHE_EXAMEXERCISE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_EXAMEXERCISE).clear();
    }

    @Before("execution(* jmaster.io.hackerthon.service.ExamExerciseService.update(*))")
    public void update(JoinPoint joinPoint) {
        ExamExerciseDTO examExerciseDTO = (ExamExerciseDTO) joinPoint.getArgs()[0];
        ExamExercise currentUser = examExerciseRepo.findById(examExerciseDTO.getId()).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_EXAMEXERCISE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_EXAMEXERCISE).evict(currentUser.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.ExamExerciseService.delete(*))")
    public void delete(JoinPoint joinPoint) {
        int id = (Integer) joinPoint.getArgs()[0];
        ExamExercise currentUser = examExerciseRepo.findById(id).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_EXAMEXERCISE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_EXAMEXERCISE).evict(currentUser.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.ExamExerciseService.deleteAll(*))")
    public void deleteAll(JoinPoint joinPoint) {
        @SuppressWarnings("unchecked")
        List<Integer> ids = (List<Integer>) joinPoint.getArgs()[0];

        List<ExamExercise> examExercises = examExerciseRepo.findAllById(ids);

        // clear cache
        examExercises.forEach(examExercise -> {
            cacheManager.getCache(CacheNames.CACHE_EXAMEXERCISE).evict(examExercise.getId());
        });
        cacheManager.getCache(CacheNames.CACHE_EXAMEXERCISE_FIND).clear();
    }
}
