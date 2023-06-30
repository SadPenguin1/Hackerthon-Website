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

import jmaster.io.hackerthon.dto.ExamDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.entity.Exam;
import jmaster.io.hackerthon.repository.ExamRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface ExamService {
    void create(ExamDTO examDTO);

    void update(ExamDTO examDTO);

    void delete(Integer id);

    void deleteAll(List<Integer> ids);

    ExamDTO get(Integer id);

    ResponseDTO<List<ExamDTO>> find(SearchDTO searchDTO);
}

@Service
class ExamServiceImpl implements  ExamService{

    @Autowired
    ExamRepo examRepo;

 
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXAM_FIND,allEntries = true)
    public void create(ExamDTO examDTO) {
        ModelMapper mapper = new ModelMapper();
        Exam exam = mapper.map(examDTO, Exam.class);
        examRepo.save(exam);
        
        examDTO.setId(exam.getId());
    }
    
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXAM_FIND,allEntries = true)
    public void update(ExamDTO examDTO) {
        ModelMapper mapper = new ModelMapper();
        mapper.createTypeMap(ExamDTO.class, Exam.class)
                .setProvider(p -> examRepo.findById(examDTO.getId()).orElseThrow(NoResultException::new));

        Exam exam = mapper.map(examDTO, Exam.class);
        examRepo.save(exam);
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXAM_FIND,allEntries = true)
    public void delete(Integer id) {
        Exam exam = examRepo.findById(id).orElseThrow(NoResultException::new);
        if(exam!= null){
        	examRepo.deleteById(id);
        }
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXAM_FIND,allEntries = true)
    public void deleteAll(List<Integer> ids) {
    	examRepo.deleteAllByIdInBatch(ids);
    }

    @Cacheable(CacheNames.CACHE_EXAM)
    @Override
    public ExamDTO get(Integer id) {
        return examRepo.findById(id).map(exam -> convert(exam)).orElseThrow(NoResultException::new);
    }

    @Cacheable(cacheNames = CacheNames.CACHE_EXAM_FIND, unless = "#result.totalElements == 0", key = "#searchDTO.toString()")
    @Override
    public ResponseDTO<List<ExamDTO>> find(SearchDTO searchDTO) {
        List<Sort.Order> orders = Optional.ofNullable(searchDTO.getOrders()).orElseGet(Collections::emptyList).stream()
                .map(order -> {
                    if (order.getOrder().equals(SearchDTO.ASC))
                        return Sort.Order.asc(order.getProperty());

                    return Sort.Order.desc(order.getProperty());
                }).collect(Collectors.toList());

        Pageable pageable = PageRequest.of(searchDTO.getPage(), searchDTO.getSize(), Sort.by(orders));

        Page<Exam> page = examRepo.find(searchDTO.getValue(), pageable);

        ResponseDTO<List<ExamDTO>> responseDTO = new ModelMapper().map(page, ResponseDTO.class);
        responseDTO.setData(page.get().map(exam -> convert(exam)).collect(Collectors.toList()));
        return responseDTO;
    }

    private ExamDTO convert(Exam exam) {
        return new ModelMapper().map(exam, ExamDTO.class);
    }
}
