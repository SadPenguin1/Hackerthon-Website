package jmaster.io.hackerthon.dto;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;

import lombok.Data;

@Data
public class AnswerDTO {
    private Integer id;
    private String userAnswer;
    private UserDTO user;
    private ExerciseDTO exercise;
	private Date createdAt;
	private String createAt;
	private  double score;
	private String verdict;
	private String language;

	private Integer averageExecutionDuration;
	
    

}