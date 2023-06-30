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
import jmaster.io.hackerthon.dto.SolutionDTO;
import jmaster.io.hackerthon.entity.Solution;
import jmaster.io.hackerthon.repository.SolutionRepo;
import jmaster.io.hackerthon.utils.CacheNames;

import javax.persistence.NoResultException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface SolutionService {
    void create(SolutionDTO solutionDTO);

    void update(SolutionDTO solutionDTO);

    void delete(Integer id);

    void deleteAll(List<Integer> ids);

    SolutionDTO get(Integer id);

    ResponseDTO<List<SolutionDTO>> find(SearchDTO searchDTO);
}

@Service
class SolutionServiceImpl implements  SolutionService{

    @Autowired
    SolutionRepo solutionRepo;

 
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_SOLUTION_FIND,allEntries = true)
    public void create(SolutionDTO solutionDTO) {
        ModelMapper mapper = new ModelMapper();
        Solution solution = mapper.map(solutionDTO, Solution.class);
        solutionRepo.save(solution);
        
        solutionDTO.setId(solution.getId());
    }
    
    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_SOLUTION_FIND,allEntries = true)
    public void update(SolutionDTO solutionDTO) {
        ModelMapper mapper = new ModelMapper();
        mapper.createTypeMap(SolutionDTO.class, Solution.class)
                .setProvider(p -> solutionRepo.findById(solutionDTO.getId()).orElseThrow(NoResultException::new));

        Solution solution = mapper.map(solutionDTO, Solution.class);
        solutionRepo.save(solution);
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_SOLUTION_FIND,allEntries = true)
    public void delete(Integer id) {
        Solution course = solutionRepo.findById(id).orElseThrow(NoResultException::new);
        if(course!= null){
        	solutionRepo.deleteById(id);
        }
    }

    @Transactional
    @Override
    @CacheEvict(value = CacheNames.CACHE_SOLUTION_FIND,allEntries = true)
    public void deleteAll(List<Integer> ids) {
    	solutionRepo.deleteAllByIdInBatch(ids);
    }

    @Cacheable(CacheNames.CACHE_SOLUTION)
    @Override
    public SolutionDTO get(Integer id) {
        return solutionRepo.findById(id).map(solution -> convert(solution)).orElseThrow(NoResultException::new);
    }

    @Cacheable(cacheNames = CacheNames.CACHE_SOLUTION_FIND, unless = "#result.totalElements == 0", key = "#searchDTO.toString()")
    @Override
    public ResponseDTO<List<SolutionDTO>> find(SearchDTO searchDTO) {
        List<Sort.Order> orders = Optional.ofNullable(searchDTO.getOrders()).orElseGet(Collections::emptyList).stream()
                .map(order -> {
                    if (order.getOrder().equals(SearchDTO.ASC))
                        return Sort.Order.asc(order.getProperty());

                    return Sort.Order.desc(order.getProperty());
                }).collect(Collectors.toList());

        Pageable pageable = PageRequest.of(searchDTO.getPage(), searchDTO.getSize(), Sort.by(orders));

        Page<Solution> page = solutionRepo.find(searchDTO.getValue(), pageable);

        ResponseDTO<List<SolutionDTO>> responseDTO = new ModelMapper().map(page, ResponseDTO.class);
        responseDTO.setData(page.get().map(solution -> convert(solution)).collect(Collectors.toList()));
        return responseDTO;
    }

    private SolutionDTO convert(Solution solution) {
        return new ModelMapper().map(solution, SolutionDTO.class);
    }
}
