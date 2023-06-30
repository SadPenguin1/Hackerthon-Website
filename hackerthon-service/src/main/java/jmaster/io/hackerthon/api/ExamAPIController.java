package jmaster.io.hackerthon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jmaster.io.hackerthon.dto.ExamDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.service.ExamService;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/exam")
public class ExamAPIController {
    @Autowired
    private ExamService examService;

    @PostMapping("/")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<ExamDTO> create(@RequestBody @Valid ExamDTO examDTO) throws IOException {
    	examService.create(examDTO);
        return ResponseDTO.<ExamDTO>builder().code(String.valueOf(HttpStatus.OK.value())).data(examDTO).build();
    }

    @PutMapping(value = "/")
  //  @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> update(@RequestBody @Valid ExamDTO examDTO) throws IOException {
    	examService.update(examDTO);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @GetMapping(value = "/{id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<ExamDTO> get(@PathVariable(value = "id") int id) {
        return ResponseDTO.<ExamDTO>builder().code(String.valueOf(HttpStatus.OK.value()))
                .data(examService.get(id)).build();
    }

    @DeleteMapping(value = "/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> delete(@PathVariable(value = "id") int id) {
    	examService.delete(id);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @DeleteMapping("/delete/all/{ids}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> deleteAll(@PathVariable(value = "ids") List<Integer> ids) {
    	examService.deleteAll(ids);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }


    @PostMapping("/search")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<List<ExamDTO>> search(@RequestBody @Valid SearchDTO searchDTO) {
        return examService.find(searchDTO);
    }

}
