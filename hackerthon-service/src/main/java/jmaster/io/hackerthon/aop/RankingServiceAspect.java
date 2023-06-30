package jmaster.io.hackerthon.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import jmaster.io.hackerthon.dto.RankingDTO;
import jmaster.io.hackerthon.entity.Ranking;
import jmaster.io.hackerthon.repository.RankingRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.List;

@Aspect
@Component
public class RankingServiceAspect {
    @Autowired
    CacheManager cacheManager;

    @Autowired
    RankingRepo rankingRepo;

    @Before("execution(* jmaster.io.hackerthon.service.RankingService.create(*))")
    public void create(JoinPoint joinPoint) {
        cacheManager.getCache(CacheNames.CACHE_SCORE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_SCORE).clear();
    }

    @Before("execution(* jmaster.io.hackerthon.service.RankingService.update(*))")
    public void update(JoinPoint joinPoint) {
        RankingDTO ScoreDTO = (RankingDTO) joinPoint.getArgs()[0];
        Ranking currentUser = rankingRepo.findById(ScoreDTO.getId()).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_SCORE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_SCORE).evict(currentUser.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.RankingService.delete(*))")
    public void delete(JoinPoint joinPoint) {
        int id = (Integer) joinPoint.getArgs()[0];
        Ranking currentUser = rankingRepo.findById(id).orElseThrow(NoResultException::new);

        cacheManager.getCache(CacheNames.CACHE_SCORE_FIND).clear();
        cacheManager.getCache(CacheNames.CACHE_SCORE).evict(currentUser.getId());
    }

    @Before("execution(* jmaster.io.hackerthon.service.RankingService.deleteAll(*))")
    public void deleteAll(JoinPoint joinPoint) {
        @SuppressWarnings("unchecked")
        List<Integer> ids = (List<Integer>) joinPoint.getArgs()[0];

        List<Ranking> Rankings = rankingRepo.findAllById(ids);

        // clear cache
        Rankings.forEach(Ranking -> {
            cacheManager.getCache(CacheNames.CACHE_SCORE).evict(Ranking.getId());
        });
        cacheManager.getCache(CacheNames.CACHE_SCORE_FIND).clear();
    }
}
