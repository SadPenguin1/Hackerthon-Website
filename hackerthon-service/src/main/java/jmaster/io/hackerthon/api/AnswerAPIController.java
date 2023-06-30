package jmaster.io.hackerthon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.service.AnswerService;
import jmaster.io.hackerthon.dto.AnswerDTO;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/answer")
public class AnswerAPIController {
    @Autowired
    private AnswerService answerService;

    @PostMapping("/")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<AnswerDTO> create(@RequestBody @Valid AnswerDTO answerDTO) throws IOException {
    	answerService.create(answerDTO);
        return ResponseDTO.<AnswerDTO>builder().code(String.valueOf(HttpStatus.OK.value())).data(answerDTO).build();
    }


    @PutMapping(value = "/")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> update(@RequestBody @Valid AnswerDTO answerDTO) throws IOException {
    	answerService.update(answerDTO);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @GetMapping(value = "/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<AnswerDTO> get(@PathVariable(value = "id") int id) {
        return ResponseDTO.<AnswerDTO>builder().code(String.valueOf(HttpStatus.OK.value()))
                .data(answerService.get(id)).build();
    }

    @DeleteMapping(value = "/{id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> delete(@PathVariable(value = "id") int id) {
    	answerService.delete(id);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @DeleteMapping("/{ids}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> deleteAll(@PathVariable(value = "ids") List<Integer> ids) {
    	answerService.deleteAll(ids);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }


    @PostMapping("/search")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<List<AnswerDTO>> search(@RequestBody @Valid SearchDTO searchDTO) {
        return answerService.find(searchDTO);
    }

}
