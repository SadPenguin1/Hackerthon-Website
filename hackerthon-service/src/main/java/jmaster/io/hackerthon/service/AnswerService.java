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
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.dto.AnswerDTO;
import jmaster.io.hackerthon.entity.Answer;
import jmaster.io.hackerthon.repository.AnswerRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface AnswerService {
    void create(AnswerDTO answerDTO);

    void update(AnswerDTO answerDTO);

    void delete(Integer id);

    void deleteAll(List<Integer> ids);

    AnswerDTO get(Integer id);

    ResponseDTO<List<AnswerDTO>> find(SearchDTO searchDTO);
}

@Service
class StudentServiceImpl implements  AnswerService{

    @Autowired
    AnswerRepo anwserRepo;

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_ANSWER_FIND,allEntries = true)
    public void create(AnswerDTO answerDTO) {
        ModelMapper mapper = new ModelMapper();
        Answer answer = mapper.map(answerDTO, Answer.class);
        anwserRepo.save(answer);
        answerDTO.setId(answer.getId());
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_ANSWER_FIND,allEntries = true)
    public void update(AnswerDTO answerDTO) {
        ModelMapper mapper = new ModelMapper();
        mapper.createTypeMap(AnswerDTO.class, Answer.class)
                .setProvider(p -> anwserRepo.findById(answerDTO.getId()).orElseThrow(NoResultException::new));

        Answer answer = mapper.map(answerDTO, Answer.class);
        anwserRepo.save(answer);
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_ANSWER_FIND,allEntries = true)
    public void delete(Integer id) {
    	Answer answer = anwserRepo.findById(id).orElseThrow(NoResultException::new);
        if(answer!= null){
        	anwserRepo.deleteById(id);
        }
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_ANSWER_FIND,allEntries = true)
    public void deleteAll(List<Integer> ids) {
    	anwserRepo.deleteAllByIdInBatch(ids);
    }

    @Cacheable(CacheNames.CACHE_ANSWER)
    @Override
    public AnswerDTO get(Integer id) {
        return anwserRepo.findById(id).map(answer -> convert(answer)).orElseThrow(NoResultException::new);
    }

//    @Cacheable(cacheNames = CacheNames.CACHE_ANSWER_FIND, unless = "#result.totalElements == 0", key = "#searchDTO.toString()")
    @Override
    public ResponseDTO<List<AnswerDTO>> find(SearchDTO searchDTO) {
        List<Sort.Order> orders = Optional.ofNullable(searchDTO.getOrders()).orElseGet(Collections::emptyList).stream()
                .map(order -> {
                    if (order.getOrder().equals(SearchDTO.ASC))
                        return Sort.Order.asc(order.getProperty());

                    return Sort.Order.desc(order.getProperty());
                }).collect(Collectors.toList());

        Pageable pageable = PageRequest.of(searchDTO.getPage(), searchDTO.getSize(), Sort.by(orders));

        Page<Answer> page = anwserRepo.find(searchDTO.getValue(), pageable);

        ResponseDTO<List<AnswerDTO>> responseDTO = new ModelMapper().map(page, ResponseDTO.class);
        responseDTO.setData(page.get().map(answer -> convert(answer)).collect(Collectors.toList()));
        return responseDTO;
    }

    private AnswerDTO convert(Answer answer) {
        return new ModelMapper().map(answer, AnswerDTO.class);
    }
}
