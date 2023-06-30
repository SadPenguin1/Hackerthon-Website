package jmaster.io.hackerthon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jmaster.io.hackerthon.dto.TagExerciseDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.service.TagExerciseService;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/tag-exercise")
public class TagExerciseAPIController {
    @Autowired
    private TagExerciseService tagExerciseService;

    @PostMapping("/")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<TagExerciseDTO> create(@RequestBody @Valid TagExerciseDTO tagExerciseDTO) throws IOException {
    	tagExerciseService.create(tagExerciseDTO);
        return ResponseDTO.<TagExerciseDTO>builder().code(String.valueOf(HttpStatus.OK.value())).data(tagExerciseDTO).build();
    }

    @PutMapping(value = "/")
  //  @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> update(@RequestBody @Valid TagExerciseDTO tagExerciseDTO) throws IOException {
    	tagExerciseService.update(tagExerciseDTO);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @GetMapping(value = "/{id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<TagExerciseDTO> get(@PathVariable(value = "id") int id) {
        return ResponseDTO.<TagExerciseDTO>builder().code(String.valueOf(HttpStatus.OK.value()))
                .data(tagExerciseService.get(id)).build();
    }

    @DeleteMapping(value = "/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> delete(@PathVariable(value = "id") int id) {
    	tagExerciseService.delete(id);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @DeleteMapping("/delete/all/{ids}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> deleteAll(@PathVariable(value = "ids") List<Integer> ids) {
    	tagExerciseService.deleteAll(ids);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }


    @PostMapping("/search")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<List<TagExerciseDTO>> search(@RequestBody @Valid SearchDTO searchDTO) {
        return tagExerciseService.find(searchDTO);
    }

}
