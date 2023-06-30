package jmaster.io.hackerthon.ws;

import java.util.Map;

//import jmaster.io.hackerthon.ws.models.testcases.TestCaseResult;
import lombok.Data;

@Data
public class ResultDTO {
	 private String verdict;
	 private float statusCode;
	 private String error;
	 private Map<String, TestCasesResult> testCasesResult;
	 private float compilationDuration;
	 private float averageExecutionDuration;
	 private float timeLimit;
	 private float memoryLimit;
	 private String language;
	 private String dateTime;
}
