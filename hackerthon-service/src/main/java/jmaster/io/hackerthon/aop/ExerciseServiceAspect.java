package jmaster.io.hackerthon.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import jmaster.io.hackerthon.dto.ExerciseDTO;
import jmaster.io.hackerthon.entity.Exercise;
import jmaster.io.hackerthon.repository.ExerciseRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.List;

@Aspect
@Component
public class ExerciseServiceAspect {
    @Autowired
    CacheManager cacheManager;

    @Autowired
    ExerciseRepo exerciseRepo;

    @Before("execution(* jmaster.io.hackerthon.service.ExerciseService.create(*))")
    public void create(JoinPoint joinPoint) {
        cacheManager.getCache(CacheNames.CACHE_EXERCISE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_EXERCISE).clear();
    }

    @Before("execution(* jmaster.io.hackerthon.service.ExerciseService.update(*))")
    public void update(JoinPoint joinPoint) {
        ExerciseDTO EXERCISEDTO = (ExerciseDTO) joinPoint.getArgs()[0];
        Exercise currentUser = exerciseRepo.findById(EXERCISEDTO.getId()).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_EXERCISE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_EXERCISE).evict(currentUser.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.ExerciseService.delete(*))")
    public void delete(JoinPoint joinPoint) {
        int id = (Integer) joinPoint.getArgs()[0];
        Exercise currentUser = exerciseRepo.findById(id).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_EXERCISE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_EXERCISE).evict(currentUser.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.ExerciseService.deleteAll(*))")
    public void deleteAll(JoinPoint joinPoint) {
        @SuppressWarnings("unchecked")
        List<Integer> ids = (List<Integer>) joinPoint.getArgs()[0];

        List<Exercise> exercises = exerciseRepo.findAllById(ids);

        // clear cache
        exercises.forEach(exercise -> {
            cacheManager.getCache(CacheNames.CACHE_EXERCISE).evict(exercise.getId());
        });
        cacheManager.getCache(CacheNames.CACHE_EXERCISE_FIND).clear();
    }
}
