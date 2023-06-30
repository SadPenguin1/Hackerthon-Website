package jmaster.io.hackerthon.entity;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "ranking")
@Data
@EqualsAndHashCode(callSuper = false)
public class Ranking  {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(insertable = false)
	private Integer id;

	private double totalScore;
	
	@CreatedDate    //tu dong
	private Date createAt;

	@OneToOne
	private User user;
	
	
	

}
