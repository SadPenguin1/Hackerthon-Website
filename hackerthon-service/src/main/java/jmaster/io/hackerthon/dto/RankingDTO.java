package jmaster.io.hackerthon.dto;

import java.util.Date;
import java.util.List;

import jmaster.io.hackerthon.entity.Answer;
import lombok.Data;

@Data
public class RankingDTO {
	private Integer id;
	
	private double totalScore = 0;
	
	private UserDTO user;
	
	private Date create_at;
	
	private int userId;
	
	
}