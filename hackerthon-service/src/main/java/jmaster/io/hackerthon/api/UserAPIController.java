package jmaster.io.hackerthon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.dto.UserDTO;
import jmaster.io.hackerthon.service.UserService;

import javax.validation.Valid;

import java.io.File;
import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/user")
public class UserAPIController {
    @Autowired
    private UserService userService;

    @PostMapping("/")
  //  @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<UserDTO> create(@ModelAttribute @Valid UserDTO userDTO) throws IOException {
    	if (userDTO.getFile() != null && !userDTO.getFile().isEmpty()) {
           
            final String UPLOAD_FOLDER = "C:/Users/Admin/Documents/hackerthon/hackerthon-Image/";
            String filename = userDTO.getFile().getOriginalFilename();
            File newFile = new File(UPLOAD_FOLDER + filename);

            userDTO.getFile().transferTo(newFile);
            userDTO.setAvatar(filename);
        }
        // goi qua Service
        userService.create(userDTO);
        return ResponseDTO.<UserDTO>builder().code(String.valueOf(HttpStatus.OK.value())).data(userDTO).build();
    }
    @PutMapping("/")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> update(@ModelAttribute @Valid UserDTO userDTO) throws IOException {
        userService.update(userDTO);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @GetMapping("/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<UserDTO> get(@PathVariable(value = "id") int id) {
        return ResponseDTO.<UserDTO>builder().code(String.valueOf(HttpStatus.OK.value()))
                .data(userService.get(id)).build();
    }

    @DeleteMapping("/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> delete(@PathVariable(value = "id") int id) {
    	
        userService.delete(id);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @DeleteMapping("/delete/all/{ids}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> deleteAll(@PathVariable(value = "ids") List<Integer> ids) {
        userService.deleteAll(ids);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }


    @PostMapping("/search")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<List<UserDTO>> search(@RequestBody @Valid SearchDTO searchDTO) {
        return userService.find(searchDTO);
    }
}
