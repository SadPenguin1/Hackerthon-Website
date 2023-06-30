package jmaster.io.hackerthon.ws;

import lombok.Data;

@Data
public class TestCasesResult {
	 
//	 private AdditionalProp1 additionalProp1;
//	 private AdditionalProp2 additionalProp2;
	private String verdict;
    private int verdictStatusCode;
    private String output;
    private String error;
    private String expectedOutput;
    private int executionDuration;

}
