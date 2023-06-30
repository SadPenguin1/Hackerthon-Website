package jmaster.io.hackerthon.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

@Data
public class UserDTO {
    private Integer id;
      
    private String name;

    private String username;

    private String password;
    
    private String avatar;
    
    private MultipartFile file;

    private boolean enabled;

    private String email;
    
    private Date birthday;

    private List<RoleDTO> roles ;
}
