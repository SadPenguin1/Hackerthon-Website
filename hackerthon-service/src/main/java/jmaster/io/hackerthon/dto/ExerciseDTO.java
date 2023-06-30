package jmaster.io.hackerthon.dto;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jmaster.io.hackerthon.entity.Category;
import lombok.Data;

@Data
public class ExerciseDTO {
    private Integer id;
    private String title;
    private String output;
    private String input;
    private Date createdAt;
    private String description;
	private String difficulty;
	private String editional;
	//private MultipartFile file;
	private Integer orderNo;
	
//	@JsonManagedReference
	private CategoryDTO category;

}