package jmaster.io.hackerthon.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import jmaster.io.hackerthon.dto.TagDTO;
import jmaster.io.hackerthon.entity.Tag;
import jmaster.io.hackerthon.repository.TagRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.List;

@Aspect
@Component
public class TagServiceAspect {
    @Autowired
    CacheManager cacheManager;

    @Autowired
    TagRepo tagRepo;

    @Before("execution(* jmaster.io.hackerthon.service.TagService.create(*))")
    public void create(JoinPoint joinPoint) {
        cacheManager.getCache(CacheNames.CACHE_TAG_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_TAG).clear();
    }

    @Before("execution(* jmaster.io.hackerthon.service.TagService.update(*))")
    public void update(JoinPoint joinPoint) {
        TagDTO tagDTO = (TagDTO) joinPoint.getArgs()[0];
        Tag tag = tagRepo.findById(tagDTO.getId()).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_TAG_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_TAG).evict(tag.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.TagService.delete(*))")
    public void delete(JoinPoint joinPoint) {
        int id = (Integer) joinPoint.getArgs()[0];
        Tag tag = tagRepo.findById(id).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_TAG_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_TAG).evict(tag.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.TagService.deleteAll(*))")
    public void deleteAll(JoinPoint joinPoint) {
        @SuppressWarnings("unchecked")
        List<Integer> ids = (List<Integer>) joinPoint.getArgs()[0];

        List<Tag> tags = tagRepo.findAllById(ids);

        // clear cache
        tags.forEach(tag -> {
            cacheManager.getCache(CacheNames.CACHE_TAG).evict(tag.getId());
        });
        cacheManager.getCache(CacheNames.CACHE_TAG_FIND).clear();
    }
}
