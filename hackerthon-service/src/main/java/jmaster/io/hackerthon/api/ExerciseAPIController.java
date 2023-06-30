package jmaster.io.hackerthon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jmaster.io.hackerthon.dto.CategoryDTO;
import jmaster.io.hackerthon.dto.ExerciseDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.dto.UserDTO;
import jmaster.io.hackerthon.service.ExerciseService;

import javax.validation.Valid;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/exercise")
public class ExerciseAPIController {
    @Autowired
    private ExerciseService exerciseService;

    @PostMapping("/")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<ExerciseDTO> create(@RequestBody @Valid ExerciseDTO exerciseDTO) throws IOException {
    	
//    	if (exerciseDTO.getFile() != null && !exerciseDTO.getFile().isEmpty()) {
//            
//            final String UPLOAD_FOLDER = "C:/Users/Admin/Documents/hackerthon/hackerthon-Image/";
//            String filename = exerciseDTO.getFile().getOriginalFilename();
//            File newFile = new File(UPLOAD_FOLDER + filename);
//
//            exerciseDTO.getFile().transferTo(newFile);
//            exerciseDTO.setImage(filename);
//        }
//        // goi qua Service
    	exerciseService.create(exerciseDTO);
        return ResponseDTO.<ExerciseDTO>builder().code(String.valueOf(HttpStatus.OK.value())).data(exerciseDTO).build();
    }

    @PutMapping(value = "/")
  //  @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> update(@RequestBody @Valid ExerciseDTO exerciseDTO) throws IOException {
    	exerciseService.update(exerciseDTO);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @GetMapping(value = "/{id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<ExerciseDTO> get(@PathVariable(value = "id") int id) {
        return ResponseDTO.<ExerciseDTO>builder().code(String.valueOf(HttpStatus.OK.value()))
                .data(exerciseService.get(id)).build();
    }

    @DeleteMapping(value = "/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> delete(@PathVariable(value = "id") int id) {
    	exerciseService.delete(id);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @DeleteMapping("/delete/all/{ids}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> deleteAll(@PathVariable(value = "ids") List<Integer> ids) {
    	exerciseService.deleteAll(ids);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }


    @PostMapping("/search")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<List<ExerciseDTO>> search(@RequestBody @Valid SearchDTO searchDTO) {
        return exerciseService.find(searchDTO);
    }

}
