package jmaster.io.hackerthon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.dto.RoleDTO;
import jmaster.io.hackerthon.dto.SearchDTO;
import jmaster.io.hackerthon.service.RoleService;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/role")
public class RoleAPIController {
    @Autowired
    private RoleService roleService;

    @PostMapping("/")
  //  @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<RoleDTO> create(@RequestBody @Valid RoleDTO RoleDTO) throws IOException {
        roleService.create(RoleDTO);
        return ResponseDTO.<RoleDTO>builder().code(String.valueOf(HttpStatus.OK.value())).data(RoleDTO).build();
    }

    @PutMapping("/")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> update(@RequestBody @Valid RoleDTO RoleDTO) throws IOException {
        roleService.update(RoleDTO);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @GetMapping("/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<RoleDTO> get(@PathVariable(value = "id") int id) {
        return ResponseDTO.<RoleDTO>builder().code(String.valueOf(HttpStatus.OK.value()))
                .data(roleService.get(id)).build();
    }

    @DeleteMapping("/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> delete(@PathVariable(value = "id") int id) {
        roleService.delete(id);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }

    @DeleteMapping("/delete/all/{ids}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<Void> deleteAll(@PathVariable(value = "ids") List<Integer> ids) {
        roleService.deleteAll(ids);
        return ResponseDTO.<Void>builder().code(String.valueOf(HttpStatus.OK.value())).build();
    }


    @PostMapping("/search")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<List<RoleDTO>> search(@RequestBody @Valid SearchDTO searchDTO) {
        return roleService.find(searchDTO);
    }
}
