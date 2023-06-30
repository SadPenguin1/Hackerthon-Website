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

import jmaster.io.hackerthon.dto.TagExerciseDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.entity.TagExercise;
import jmaster.io.hackerthon.repository.TagExerciseRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface TagExerciseService {
    void create(TagExerciseDTO tagExerciseDTO);

    void update(TagExerciseDTO tagExerciseDTO);

    void delete(Integer id);

    void deleteAll(List<Integer> ids);

    TagExerciseDTO get(Integer id);

    ResponseDTO<List<TagExerciseDTO>> find(SearchDTO searchDTO);
}

@Service
class TagExerciseServiceImpl implements  TagExerciseService{

    @Autowired
    TagExerciseRepo tagExerciseRepo;

 
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_TAGEXERCISE_FIND,allEntries = true)
    public void create(TagExerciseDTO tagExerciseDTO) {
        ModelMapper mapper = new ModelMapper();
        TagExercise tagExercise = mapper.map(tagExerciseDTO, TagExercise.class);
        tagExerciseRepo.save(tagExercise);
        
        tagExerciseDTO.setId(tagExercise.getId());
    }
    
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_TAGEXERCISE_FIND,allEntries = true)
    public void update(TagExerciseDTO tagExerciseDTO) {
        ModelMapper mapper = new ModelMapper();
        mapper.createTypeMap(TagExerciseDTO.class, TagExercise.class)
                .setProvider(p -> tagExerciseRepo.findById(tagExerciseDTO.getId()).orElseThrow(NoResultException::new));

        TagExercise tagExercise = mapper.map(tagExerciseDTO, TagExercise.class);
        tagExerciseRepo.save(tagExercise);
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_TAGEXERCISE_FIND,allEntries = true)
    public void delete(Integer id) {
        TagExercise tagExercise = tagExerciseRepo.findById(id).orElseThrow(NoResultException::new);
        if(tagExercise!= null){
        	tagExerciseRepo.deleteById(id);
        }
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_TAGEXERCISE_FIND,allEntries = true)
    public void deleteAll(List<Integer> ids) {
    	tagExerciseRepo.deleteAllByIdInBatch(ids);
    }

    @Cacheable(CacheNames.CACHE_TAGEXERCISE)
    @Override
    public TagExerciseDTO get(Integer id) {
        return tagExerciseRepo.findById(id).map(tagExercise -> convert(tagExercise)).orElseThrow(NoResultException::new);
    }

    @Cacheable(cacheNames = CacheNames.CACHE_TAGEXERCISE_FIND, unless = "#result.totalElements == 0", key = "#searchDTO.toString()")
    @Override
    public ResponseDTO<List<TagExerciseDTO>> find(SearchDTO searchDTO) {
        List<Sort.Order> orders = Optional.ofNullable(searchDTO.getOrders()).orElseGet(Collections::emptyList).stream()
                .map(order -> {
                    if (order.getOrder().equals(SearchDTO.ASC))
                        return Sort.Order.asc(order.getProperty());

                    return Sort.Order.desc(order.getProperty());
                }).collect(Collectors.toList());

        Pageable pageable = PageRequest.of(searchDTO.getPage(), searchDTO.getSize(), Sort.by(orders));

        Page<TagExercise> page = tagExerciseRepo.findAll(pageable);

        ResponseDTO<List<TagExerciseDTO>> responseDTO = new ModelMapper().map(page, ResponseDTO.class);
        responseDTO.setData(page.get().map(tagExercise -> convert(tagExercise)).collect(Collectors.toList()));
        return responseDTO;
    }

    private TagExerciseDTO convert(TagExercise tagExercise) {
        return new ModelMapper().map(tagExercise, TagExerciseDTO.class);
    }
}
