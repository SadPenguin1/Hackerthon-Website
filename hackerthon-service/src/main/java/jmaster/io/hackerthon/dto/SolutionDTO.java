package jmaster.io.hackerthon.dto;

import java.util.Date;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
public class SolutionDTO {
    private Integer id;
    private String content;
    private Integer likes;
    private Date createdAt;
 
//	@JsonManagedReference
	private ExerciseDTO exercise;

}