package jmaster.io.hackerthon.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import jmaster.io.hackerthon.dto.TagExerciseDTO;
import jmaster.io.hackerthon.entity.TagExercise;
import jmaster.io.hackerthon.repository.TagExerciseRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.List;

@Aspect
@Component
public class TagExerciseServiceAspect {
    @Autowired
    CacheManager cacheManager;

    @Autowired
    TagExerciseRepo tagExerciseRepo;

    @Before("execution(* jmaster.io.hackerthon.service.TagExerciseService.create(*))")
    public void create(JoinPoint joinPoint) {
        cacheManager.getCache(CacheNames.CACHE_TAGEXERCISE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_TAGEXERCISE).clear();
    }

    @Before("execution(* jmaster.io.hackerthon.service.TagExerciseService.update(*))")
    public void update(JoinPoint joinPoint) {
        TagExerciseDTO tagExerciseDTO = (TagExerciseDTO) joinPoint.getArgs()[0];
        TagExercise tagExercise = tagExerciseRepo.findById(tagExerciseDTO.getId()).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_TAGEXERCISE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_TAGEXERCISE).evict(tagExercise.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.TagExerciseService.delete(*))")
    public void delete(JoinPoint joinPoint) {
        int id = (Integer) joinPoint.getArgs()[0];
        TagExercise tagExercise = tagExerciseRepo.findById(id).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_TAGEXERCISE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_TAGEXERCISE).evict(tagExercise.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.TagExerciseService.deleteAll(*))")
    public void deleteAll(JoinPoint joinPoint) {
        @SuppressWarnings("unchecked")
        List<Integer> ids = (List<Integer>) joinPoint.getArgs()[0];

        List<TagExercise> tagExercises = tagExerciseRepo.findAllById(ids);

        // clear cache
        tagExercises.forEach(tagExercise -> {
            cacheManager.getCache(CacheNames.CACHE_TAGEXERCISE).evict(tagExercise.getId());
        });
        cacheManager.getCache(CacheNames.CACHE_TAGEXERCISE_FIND).clear();
    }
}
