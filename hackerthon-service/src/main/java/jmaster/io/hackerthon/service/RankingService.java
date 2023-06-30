package jmaster.io.hackerthon.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.RankingDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.entity.Answer;
import jmaster.io.hackerthon.entity.Exercise;
import jmaster.io.hackerthon.entity.Ranking;
import jmaster.io.hackerthon.entity.User;
import jmaster.io.hackerthon.repository.ExerciseRepo;
import jmaster.io.hackerthon.repository.RankingRepo;
import jmaster.io.hackerthon.repository.UserRepo;
import jmaster.io.hackerthon.repository.AnswerRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;

import java.util.*;
import java.util.stream.Collectors;

public interface RankingService {
    void create(RankingDTO rankingDTO);

    void update(RankingDTO rankingDTO);

    void delete(Integer id);

    void deleteAll(List<Integer> ids);

    RankingDTO get(Integer id);

    ResponseDTO<List<RankingDTO>> find(SearchDTO searchDTO);
}

@Service
class ScoreServiceImpl implements  RankingService{
    @Autowired
    RankingRepo rankingRepo;
    
    @Autowired
    AnswerRepo answerRepo;
    
    @Autowired
    UserRepo userRepo;
    
//    public double caculatorTotalScore(Integer userId) {
//    	List<Answer> answers = answerRepo.searchByUserId(userId);
//    	 int totalScore = 0;
//    	    for (Answer answer : answers) {
//    	        totalScore += answer.getScore();
//    	    }
//    	    return totalScore;  	
//    }

    @Override
    @Transactional
    @CacheEvict(value = CacheNames.CACHE_SCORE_FIND,allEntries = true)
    public void create(RankingDTO rankingDTO) {
    	ModelMapper mapper = new ModelMapper();
        Ranking ranking  = mapper.map(rankingDTO, Ranking.class);
        
   	   
        
        rankingRepo.save(ranking);
        rankingDTO.setId(ranking.getId());
    }

    @Override
    @Transactional
    @CacheEvict(value = CacheNames.CACHE_SCORE_FIND,allEntries = true)
    public void update(RankingDTO rankingDTO) {
        Ranking ranking = rankingRepo.findById(rankingDTO.getId()).orElseThrow(NoResultException::new);
        ranking.setTotalScore(rankingDTO.getTotalScore());
        rankingRepo.save(ranking);
    }

    @Override
    @Transactional
    @CacheEvict(value = CacheNames.CACHE_SCORE_FIND,allEntries = true)
    public void delete(Integer id) {
        rankingRepo.deleteById(id);
    }

    @Override
    @Transactional
    @CacheEvict(value = CacheNames.CACHE_SCORE_FIND,allEntries = true)
    public void deleteAll(List<Integer> ids) {
        rankingRepo.deleteAllById(ids);
    }

    @Cacheable(CacheNames.CACHE_SCORE)
    @Override
    public RankingDTO get(Integer id) {
        Ranking ranking = rankingRepo.findById(id).orElseThrow(NoResultException::new);
        return new ModelMapper().map(ranking, RankingDTO.class);
    }

    @Cacheable(cacheNames = CacheNames.CACHE_SCORE_FIND, unless = "#result.totalElements == 0", key = "#searchDTO.toString()")
    @Override
    public ResponseDTO<List<RankingDTO>> find(SearchDTO searchDTO) {
        List<Sort.Order> orders = Optional.ofNullable(searchDTO.getOrders()).orElseGet(Collections::emptyList).stream()
                .map(order -> {
                    if (order.getOrder().equals(SearchDTO.ASC))
                        return Sort.Order.asc(order.getProperty());

                    return Sort.Order.desc(order.getProperty());
                }).collect(Collectors.toList());

        Pageable pageable = PageRequest.of(searchDTO.getPage(), searchDTO.getSize(), Sort.by(orders));

        Page<Ranking> page = rankingRepo.findAll(pageable);

        ResponseDTO<List<RankingDTO>> responseDTO = new ModelMapper().map(page, ResponseDTO.class);
        responseDTO.setData(page.get().map(score -> convert(score)).collect(Collectors.toList()));
        return responseDTO;
    }

    private RankingDTO convert(Ranking score) {
        return new ModelMapper().map(score, RankingDTO.class);
    }
}
