package jmaster.io.hackerthon.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.Data;

@Data
@Entity
@Table(name = "answer")
public class Answer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String userAnswer;
	
	private String verdict;
	private String language;
	
	private Integer averageExecutionDuration;
	
	private  double score;
	
	@ManyToOne
	private User user;
	
	@ManyToOne
	private Exercise exercise;

	@CreatedDate//tu dong
	private Date createdAt;
	
	private String createAt;
}
