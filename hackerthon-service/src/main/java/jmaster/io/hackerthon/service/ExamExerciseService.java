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

import jmaster.io.hackerthon.dto.ExamExerciseDTO;
import jmaster.io.hackerthon.dto.ExerciseDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.entity.ExamExercise;
import jmaster.io.hackerthon.entity.Exercise;
import jmaster.io.hackerthon.repository.ExamExerciseRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface ExamExerciseService {
    void create(ExamExerciseDTO examExerciseDTO);

    void update(ExamExerciseDTO examExerciseDTO);

    void delete(Integer id);

    void deleteAll(List<Integer> ids);

    ExamExerciseDTO get(Integer id);

    ResponseDTO<List<ExamExerciseDTO>> find(SearchDTO searchDTO);
}

@Service
class ExamExerciseServiceImpl implements  ExamExerciseService{

    @Autowired
    ExamExerciseRepo examExerciseRepo;

 
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXAMEXERCISE_FIND,allEntries = true)
    public void create(ExamExerciseDTO examExerciseDTO) {
        ModelMapper mapper = new ModelMapper();
        ExamExercise examExercise = mapper.map(examExerciseDTO, ExamExercise.class);
        examExerciseRepo.save(examExercise);
        
        examExerciseDTO.setId(examExercise.getId());
    }
    
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXAMEXERCISE_FIND,allEntries = true)
    public void update(ExamExerciseDTO examExerciseDTO) {
        ModelMapper mapper = new ModelMapper();
        mapper.createTypeMap(ExamExerciseDTO.class, ExamExercise.class)
                .setProvider(p -> examExerciseRepo.findById(examExerciseDTO.getId()).orElseThrow(NoResultException::new));

        ExamExercise examExercise = mapper.map(examExerciseDTO, ExamExercise.class);
        examExerciseRepo.save(examExercise);
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXAMEXERCISE_FIND,allEntries = true)
    public void delete(Integer id) {
        ExamExercise examExercise = examExerciseRepo.findById(id).orElseThrow(NoResultException::new);
        if(examExercise!= null){
        	examExerciseRepo.deleteById(id);
        }
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXAMEXERCISE_FIND,allEntries = true)
    public void deleteAll(List<Integer> ids) {
    	examExerciseRepo.deleteAllByIdInBatch(ids);
    }

    @Cacheable(CacheNames.CACHE_EXAMEXERCISE)
    @Override
    public ExamExerciseDTO get(Integer id) {
        return examExerciseRepo.findById(id).map(examExercise -> convert(examExercise)).orElseThrow(NoResultException::new);
    }

    @Cacheable(cacheNames = CacheNames.CACHE_EXAMEXERCISE_FIND, unless = "#result.totalElements == 0", key = "#searchDTO.toString()")
    @Override
    public ResponseDTO<List<ExamExerciseDTO>> find(SearchDTO searchDTO) {
        List<Sort.Order> orders = Optional.ofNullable(searchDTO.getOrders()).orElseGet(Collections::emptyList).stream()
                .map(order -> {
                    if (order.getOrder().equals(SearchDTO.ASC))
                        return Sort.Order.asc(order.getProperty());

                    return Sort.Order.desc(order.getProperty());
                }).collect(Collectors.toList());

        Pageable pageable = PageRequest.of(searchDTO.getPage(), searchDTO.getSize(), Sort.by(orders));

        Page<ExamExercise> page = examExerciseRepo.findAll(pageable);

        ResponseDTO<List<ExamExerciseDTO>> responseDTO = new ModelMapper().map(page, ResponseDTO.class);
        responseDTO.setData(page.get().map(examExercise -> convert(examExercise)).collect(Collectors.toList()));
        return responseDTO;
    }

    private ExamExerciseDTO convert(ExamExercise examExercise) {
        return new ModelMapper().map(examExercise, ExamExerciseDTO.class);
    }
}
