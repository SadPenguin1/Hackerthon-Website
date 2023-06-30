package jmaster.io.hackerthon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jmaster.io.hackerthon.dto.CategoryDTO;
import jmaster.io.hackerthon.dto.ExerciseDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.dto.SolutionDTO;
import jmaster.io.hackerthon.dto.UserDTO;
import jmaster.io.hackerthon.service.ExerciseService;
import jmaster.io.hackerthon.service.SolutionService;

import javax.validation.Valid;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/solution")
public class SolutionAPIController {
    @Autowired
    private SolutionService solutionService;

    @PostMapping("/")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<SolutionDTO> create(@RequestBody @Valid SolutionDTO solutionDTO) throws IOException {
    	solutionService.create(solutionDTO);
        return ResponseDTO.<SolutionDTO>builder().code(String.valueOf(HttpStatus.OK.value())).data(solutionDTO).build();
    }

    @PutMapping(value = "/")
  //  @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> update(@RequestBody @Valid SolutionDTO solutionDTO) throws IOException {
    	solutionService.update(solutionDTO);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @GetMapping(value = "/{id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<SolutionDTO> get(@PathVariable(value = "id") int id) {
        return ResponseDTO.<SolutionDTO>builder().code(String.valueOf(HttpStatus.OK.value()))
                .data(solutionService.get(id)).build();
    }

    @DeleteMapping(value = "/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> delete(@PathVariable(value = "id") int id) {
    	solutionService.delete(id);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @DeleteMapping("/delete/all/{ids}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> deleteAll(@PathVariable(value = "ids") List<Integer> ids) {
    	solutionService.deleteAll(ids);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }


    @PostMapping("/search")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<List<SolutionDTO>> search(@RequestBody @Valid SearchDTO searchDTO) {
        return solutionService.find(searchDTO);
    }

}
