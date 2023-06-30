package jmaster.io.hackerthon.ws.models;

//import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.LinkedHashMap;

import jmaster.io.hackerthon.ws.models.testcases.TestCaseResult;

/**
 * The type Execution response.
 *
 * @author Zakaria Maaraki
 */
@Getter
@EqualsAndHashCode
@Builder
public class ExecutionResponse {
    
   // @ApiModelProperty(notes = "The verdict")
    private Verdict verdict;
    
   // @ApiModelProperty(notes = "The result of each test case")
    private LinkedHashMap<String, TestCaseResult> testCasesResult;
    
   // @ApiModelProperty(notes = "The error if it occurs")
    private String error;
}
