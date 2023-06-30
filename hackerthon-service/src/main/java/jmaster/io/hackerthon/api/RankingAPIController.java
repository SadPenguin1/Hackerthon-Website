package jmaster.io.hackerthon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.RankingDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.entity.Answer;
import jmaster.io.hackerthon.entity.User;
import jmaster.io.hackerthon.repository.AnswerRepo;
import jmaster.io.hackerthon.service.RankingService;

import javax.validation.Valid;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/ranking")
public class RankingAPIController {
    @Autowired
    RankingService rankingService;
    

    @PostMapping("/")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<RankingDTO> create(@RequestBody @Valid RankingDTO rankingDTO) throws IOException {
        // goi qua Service
    	
        rankingService.create(rankingDTO);
        return ResponseDTO.<RankingDTO>builder().code(String.valueOf(HttpStatus.OK.value())).data(rankingDTO).build();
    }

    @PutMapping("/")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> update(@ModelAttribute @Valid RankingDTO scoreDTO) throws IOException {
        rankingService.update(scoreDTO);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<RankingDTO> get(@PathVariable(value = "id") int id) {
        return ResponseDTO.<RankingDTO>builder().code(String.valueOf(HttpStatus.OK.value()))
                .data(rankingService.get(id)).build();
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> delete(@PathVariable(value = "id") int id) {
        rankingService.delete(id);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @DeleteMapping("/{ids}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> deleteAll(@PathVariable(value = "ids") List<Integer> ids) {
        rankingService.deleteAll(ids);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }


    @PostMapping("/search")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<List<RankingDTO>> search(@RequestBody @Valid SearchDTO searchDTO) {
        return rankingService.find(searchDTO);
    }
}
