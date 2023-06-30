package jmaster.io.hackerthon.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor; 

@Data
@Entity
@Table(name = "solution")
@AllArgsConstructor
@NoArgsConstructor
public class Solution {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String content;

	private Integer likes;

	@CreatedDate // tu dong
	private Date createdAt;

	@ManyToOne
	@JoinColumn(name = "exercise_id")
	private Exercise exercise;

}
