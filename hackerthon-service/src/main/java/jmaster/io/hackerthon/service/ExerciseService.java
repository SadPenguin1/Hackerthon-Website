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

import jmaster.io.hackerthon.dto.ExerciseDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.entity.Exercise;
import jmaster.io.hackerthon.repository.ExerciseRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface ExerciseService {
    void create(ExerciseDTO exerciseDTO);

    void update(ExerciseDTO exerciseDTO);

    void delete(Integer id);

    void deleteAll(List<Integer> ids);

    ExerciseDTO get(Integer id);

    ResponseDTO<List<ExerciseDTO>> find(SearchDTO searchDTO);
}

@Service
class ExerciseServiceImpl implements  ExerciseService{

    @Autowired
    ExerciseRepo exerciseRepo;

 
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXERCISE_FIND,allEntries = true)
    public void create(ExerciseDTO exerciseDTO) {
        ModelMapper mapper = new ModelMapper();
        Exercise exercise = mapper.map(exerciseDTO, Exercise.class);
        exerciseRepo.save(exercise);
        
        exerciseDTO.setId(exercise.getId());
    }
    
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXERCISE_FIND,allEntries = true)
    public void update(ExerciseDTO exerciseDTO) {
        ModelMapper mapper = new ModelMapper();
        mapper.createTypeMap(ExerciseDTO.class, Exercise.class)
                .setProvider(p -> exerciseRepo.findById(exerciseDTO.getId()).orElseThrow(NoResultException::new));

        Exercise exercise = mapper.map(exerciseDTO, Exercise.class);
        exerciseRepo.save(exercise);
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXERCISE_FIND,allEntries = true)
    public void delete(Integer id) {
        Exercise course = exerciseRepo.findById(id).orElseThrow(NoResultException::new);
        if(course!= null){
        	exerciseRepo.deleteById(id);
        }
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_EXERCISE_FIND,allEntries = true)
    public void deleteAll(List<Integer> ids) {
    	exerciseRepo.deleteAllByIdInBatch(ids);
    }

    @Cacheable(CacheNames.CACHE_EXERCISE)
    @Override
    public ExerciseDTO get(Integer id) {
        return exerciseRepo.findById(id).map(exercise -> convert(exercise)).orElseThrow(NoResultException::new);
    }

    @Cacheable(cacheNames = CacheNames.CACHE_EXERCISE_FIND, unless = "#result.totalElements == 0", key = "#searchDTO.toString()")
    @Override
    public ResponseDTO<List<ExerciseDTO>> find(SearchDTO searchDTO) {
        List<Sort.Order> orders = Optional.ofNullable(searchDTO.getOrders()).orElseGet(Collections::emptyList).stream()
                .map(order -> {
                    if (order.getOrder().equals(SearchDTO.ASC))
                        return Sort.Order.asc(order.getProperty());

                    return Sort.Order.desc(order.getProperty());
                }).collect(Collectors.toList());

        Pageable pageable = PageRequest.of(searchDTO.getPage(), searchDTO.getSize(), Sort.by(orders));

        Page<Exercise> page = exerciseRepo.find(searchDTO.getValue(), pageable);

        ResponseDTO<List<ExerciseDTO>> responseDTO = new ModelMapper().map(page, ResponseDTO.class);
        responseDTO.setData(page.get().map(exercise -> convert(exercise)).collect(Collectors.toList()));
        return responseDTO;
    }

    private ExerciseDTO convert(Exercise exercise) {
        return new ModelMapper().map(exercise, ExerciseDTO.class);
    }
}
