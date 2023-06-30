package jmaster.io.hackerthon.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "tag")
@Data
@EqualsAndHashCode(callSuper = true)
public class Tag extends CreateAuditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(insertable = false)
	private Integer id;

	private String title;
	
	private String description;
		
	@CreatedDate    //tu dong
	private Date createdAt;
	

}