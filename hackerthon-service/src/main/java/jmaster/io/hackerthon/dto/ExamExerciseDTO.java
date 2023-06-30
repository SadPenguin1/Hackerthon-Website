package jmaster.io.hackerthon.dto;



import jmaster.io.hackerthon.entity.Exam;
import jmaster.io.hackerthon.entity.Exercise;
import lombok.Data;

@Data
public class ExamExerciseDTO {
    private Integer id;
    private ExamDTO exam;
    private ExerciseDTO exercise;

}