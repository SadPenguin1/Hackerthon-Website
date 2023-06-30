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

import jmaster.io.hackerthon.dto.TagDTO;
import jmaster.io.hackerthon.dto.ExerciseDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.entity.Tag;
import jmaster.io.hackerthon.repository.TagRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface TagService {
    void create(TagDTO tagDTO);

    void update(TagDTO tagDTO);

    void delete(Integer id);

    void deleteAll(List<Integer> ids);

    TagDTO get(Integer id);

    ResponseDTO<List<TagDTO>> find(SearchDTO searchDTO);
}

@Service
class TagServiceImpl implements  TagService{

    @Autowired
    TagRepo tagRepo;

 
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_TAG_FIND,allEntries = true)
    public void create(TagDTO tagDTO) {
        ModelMapper mapper = new ModelMapper();
        Tag tag = mapper.map(tagDTO, Tag.class);
        tagRepo.save(tag);
        
        tagDTO.setId(tag.getId());
    }
    
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_TAG_FIND,allEntries = true)
    public void update(TagDTO tagDTO) {
        ModelMapper mapper = new ModelMapper();
        mapper.createTypeMap(TagDTO.class, Tag.class)
                .setProvider(p -> tagRepo.findById(tagDTO.getId()).orElseThrow(NoResultException::new));

        Tag tag = mapper.map(tagDTO, Tag.class);
        tagRepo.save(tag);
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_TAG_FIND,allEntries = true)
    public void delete(Integer id) {
        Tag tag = tagRepo.findById(id).orElseThrow(NoResultException::new);
        if(tag!= null){
        	tagRepo.deleteById(id);
        }
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_TAG_FIND,allEntries = true)
    public void deleteAll(List<Integer> ids) {
    	tagRepo.deleteAllByIdInBatch(ids);
    }

    @Cacheable(CacheNames.CACHE_TAG)
    @Override
    public TagDTO get(Integer id) {
        return tagRepo.findById(id).map(tag -> convert(tag)).orElseThrow(NoResultException::new);
    }

    @Cacheable(cacheNames = CacheNames.CACHE_TAG_FIND, unless = "#result.totalElements == 0", key = "#searchDTO.toString()")
    @Override
    public ResponseDTO<List<TagDTO>> find(SearchDTO searchDTO) {
        List<Sort.Order> orders = Optional.ofNullable(searchDTO.getOrders()).orElseGet(Collections::emptyList).stream()
                .map(order -> {
                    if (order.getOrder().equals(SearchDTO.ASC))
                        return Sort.Order.asc(order.getProperty());

                    return Sort.Order.desc(order.getProperty());
                }).collect(Collectors.toList());

        Pageable pageable = PageRequest.of(searchDTO.getPage(), searchDTO.getSize(), Sort.by(orders));

        Page<Tag> page = tagRepo.find(searchDTO.getValue(), pageable);

        ResponseDTO<List<TagDTO>> responseDTO = new ModelMapper().map(page, ResponseDTO.class);
        responseDTO.setData(page.get().map(tag -> convert(tag)).collect(Collectors.toList()));
        return responseDTO;
    }

    private TagDTO convert(Tag tag) {
        return new ModelMapper().map(tag, TagDTO.class);
    }
}
