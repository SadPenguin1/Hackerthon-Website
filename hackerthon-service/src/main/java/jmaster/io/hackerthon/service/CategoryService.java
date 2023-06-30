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

import jmaster.io.hackerthon.dto.CategoryDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.entity.Category;
import jmaster.io.hackerthon.repository.CategoryRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface CategoryService {
    void create(CategoryDTO categoryDTO);

    void update(CategoryDTO categoryDTO);

    void delete(Integer id);

    void deleteAll(List<Integer> ids);

    CategoryDTO get(Integer id);

    ResponseDTO<List<CategoryDTO>> find(SearchDTO searchDTO);
}

@Service
class CategoryServiceImpl implements  CategoryService{

    @Autowired
    CategoryRepo categoryRepo;

 
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_CATEGORY_FIND,allEntries = true)
    public void create(CategoryDTO categoryDTO) {
        ModelMapper mapper = new ModelMapper();
        Category category = mapper.map(categoryDTO, Category.class);
        categoryRepo.save(category);
        
        categoryDTO.setId(category.getId());
    }
    
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_CATEGORY_FIND,allEntries = true)
    public void update(CategoryDTO categoryDTO) {
        ModelMapper mapper = new ModelMapper();
        mapper.createTypeMap(CategoryDTO.class, Category.class)
                .setProvider(p -> categoryRepo.findById(categoryDTO.getId()).orElseThrow(NoResultException::new));

        Category category = mapper.map(categoryDTO, Category.class);
        categoryRepo.save(category);
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_CATEGORY_FIND,allEntries = true)
    public void delete(Integer id) {
    	Category category = categoryRepo.findById(id).orElseThrow(NoResultException::new);
        if(category!= null){
        	categoryRepo.deleteById(id);
        }
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_CATEGORY_FIND,allEntries = true)
    public void deleteAll(List<Integer> ids) {
    	categoryRepo.deleteAllByIdInBatch(ids);
    }

    @Cacheable(CacheNames.CACHE_CATEGORY)
    @Override
    public CategoryDTO get(Integer id) {
        return categoryRepo.findById(id).map(course -> convert(course)).orElseThrow(NoResultException::new);
    }

    @Cacheable(cacheNames = CacheNames.CACHE_CATEGORY_FIND, unless = "#result.totalElements == 0", key = "#searchDTO.toString()")
    @Override
    public ResponseDTO<List<CategoryDTO>> find(SearchDTO searchDTO) {
        List<Sort.Order> orders = Optional.ofNullable(searchDTO.getOrders()).orElseGet(Collections::emptyList).stream()
                .map(order -> {
                    if (order.getOrder().equals(SearchDTO.ASC))
                        return Sort.Order.asc(order.getProperty());

                    return Sort.Order.desc(order.getProperty());
                }).collect(Collectors.toList());

        Pageable pageable = PageRequest.of(searchDTO.getPage(), searchDTO.getSize(), Sort.by(orders));

        Page<Category> page = categoryRepo.find(searchDTO.getValue(), pageable);

        ResponseDTO<List<CategoryDTO>> responseDTO = new ModelMapper().map(page, ResponseDTO.class);
        responseDTO.setData(page.get().map(category -> convert(category)).collect(Collectors.toList()));
        return responseDTO;
    }

    private CategoryDTO convert(Category category) {
        return new ModelMapper().map(category, CategoryDTO.class);
    }
}
