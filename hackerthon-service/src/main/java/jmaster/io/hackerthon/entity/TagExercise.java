package jmaster.io.hackerthon.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "tag_exercise")
@Data
@EqualsAndHashCode(callSuper = true)
public class TagExercise extends CreateAuditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(insertable = false)
	private Integer id;

	@ManyToOne
	private Tag tag;

	@ManyToOne
	private Exercise exercise;

}
