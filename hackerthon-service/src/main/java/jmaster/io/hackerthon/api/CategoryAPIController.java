package jmaster.io.hackerthon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jmaster.io.hackerthon.dto.CategoryDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.service.CategoryService;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryAPIController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<CategoryDTO> create(@RequestBody @Valid CategoryDTO CategoryDTO) throws IOException {
    	categoryService.create(CategoryDTO);
        return ResponseDTO.<CategoryDTO>builder().code(String.valueOf(HttpStatus.OK.value())).data(CategoryDTO).build();
    }

    @PutMapping(value = "/")
  //  @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> update(@RequestBody @Valid CategoryDTO CategoryDTO) throws IOException {
    	categoryService.update(CategoryDTO);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @GetMapping(value = "/{id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<CategoryDTO> get(@PathVariable(value = "id") int id) {
        return ResponseDTO.<CategoryDTO>builder().code(String.valueOf(HttpStatus.OK.value()))
                .data(categoryService.get(id)).build();
    }

    @DeleteMapping(value = "/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> delete(@PathVariable(value = "id") int id) {
    	categoryService.delete(id);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @DeleteMapping("/delete/all/{ids}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> deleteAll(@PathVariable(value = "ids") List<Integer> ids) {
    	categoryService.deleteAll(ids);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }


    @PostMapping("/search")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<List<CategoryDTO>> search(@RequestBody @Valid SearchDTO searchDTO) {
        return categoryService.find(searchDTO);
    }

}
