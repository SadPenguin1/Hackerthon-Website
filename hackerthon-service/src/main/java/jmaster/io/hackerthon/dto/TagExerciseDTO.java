package jmaster.io.hackerthon.dto;



import lombok.Data;

@Data
public class TagExerciseDTO {
    private Integer id;
    private TagDTO tag;
    private ExerciseDTO exercise;

}