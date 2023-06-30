package jmaster.io.hackerthon.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jmaster.io.hackerthon.entity.Exercise;

@Data
public class CategoryDTO {
    private Integer id;
    
    private Integer orderNo;
    
    private String title;

    private String description;
    
    private Date createdAt;
    
    //@JsonManagedReference
   // private List<ExerciseDTO> exercises ;
}
