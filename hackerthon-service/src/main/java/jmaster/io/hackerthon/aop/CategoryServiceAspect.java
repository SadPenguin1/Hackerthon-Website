package jmaster.io.hackerthon.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import jmaster.io.hackerthon.dto.CategoryDTO;
import jmaster.io.hackerthon.entity.Category;
import jmaster.io.hackerthon.repository.CategoryRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.List;

@Aspect
@Component
public class CategoryServiceAspect {
    @Autowired
    CacheManager cacheManager;

    @Autowired
    CategoryRepo categoryRepo;

    @Before("execution(* jmaster.io.hackerthon.service.CategoryService.create(*))")
    public void create(JoinPoint joinPoint) {
        cacheManager.getCache(CacheNames.CACHE_CATEGORY_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_CATEGORY).clear();
    }

    @Before("execution(* jmaster.io.hackerthon.service.CategoryService.update(*))")
    public void update(JoinPoint joinPoint) {
        CategoryDTO categoryDTO = (CategoryDTO) joinPoint.getArgs()[0];
        Category currentUser = categoryRepo.findById(categoryDTO.getId()).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_CATEGORY_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_CATEGORY).evict(currentUser.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.CategoryService.delete(*))")
    public void delete(JoinPoint joinPoint) {
        int id = (Integer) joinPoint.getArgs()[0];
        Category currentUser = categoryRepo.findById(id).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_CATEGORY_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_CATEGORY).evict(currentUser.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.CategoryService.deleteAll(*))")
    public void deleteAll(JoinPoint joinPoint) {
        @SuppressWarnings("unchecked")
        List<Integer> ids = (List<Integer>) joinPoint.getArgs()[0];

        List<Category> categories = categoryRepo.findAllById(ids);

        // clear cache
        categories.forEach(category -> {
            cacheManager.getCache(CacheNames.CACHE_CATEGORY).evict(category.getId());
        });
        cacheManager.getCache(CacheNames.CACHE_CATEGORY_FIND).clear();
    }
}
