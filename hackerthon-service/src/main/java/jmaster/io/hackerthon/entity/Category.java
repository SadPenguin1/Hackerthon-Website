package jmaster.io.hackerthon.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;


import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "category")
@EqualsAndHashCode(callSuper = false)
public class Category extends CreateAuditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private Integer orderNo;
	
	private String title;
	
	private String description;

	@CreatedDate  //tu dong
	private Date createdAt;
	
//	
//	@OneToMany(mappedBy = "category")
//	private List<Exercise> exercises;



}
