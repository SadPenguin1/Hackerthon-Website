package jmaster.io.hackerthon.ws;


import java.util.Date;
import java.util.Map;

import jmaster.io.hackerthon.dto.ExerciseDTO;
import lombok.Data;

@Data
public class CheckCodeDTO {
    private String language ; 
    private float memoryLimit ;
    private String sourcecode;
    private float timeLimit ;  
    private Map<String, TestCase> testCases;
    private ExerciseDTO exercise;
    
}