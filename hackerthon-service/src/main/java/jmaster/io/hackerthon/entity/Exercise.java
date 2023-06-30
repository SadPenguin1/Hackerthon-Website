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

import jmaster.io.hackerthon.dto.CategoryDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "exercise")
@AllArgsConstructor
@NoArgsConstructor
public class Exercise {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String title;
	
	private String input;
	
	private String output;
	
	private String description;
	
	private String difficulty;
	
	private String editional;
	
	//private String image;
	@CreatedDate    //tu dong
	private Date createdAt;
	
	private Integer orderNo;
	
	 @ManyToOne
	 @JoinColumn(name = "category_id")
	 private Category category;
	

}
