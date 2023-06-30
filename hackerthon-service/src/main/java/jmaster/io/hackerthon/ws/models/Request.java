package jmaster.io.hackerthon.ws.models;


import com.fasterxml.jackson.annotation.JsonProperty;

import jmaster.io.hackerthon.ws.mappers.TestCaseMapper;
import jmaster.io.hackerthon.ws.models.testcases.ConvertedTestCase;
import jmaster.io.hackerthon.ws.models.testcases.TestCase;
import lombok.*;
//import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * The type Request.
 *
 * @author Zakaria Maaraki
 */
@Getter
@NoArgsConstructor
@EqualsAndHashCode
@AllArgsConstructor
public class Request {
    
    /**
     * The Source code.
     */

    @NonNull
    @JsonProperty("sourcecode")
    protected String sourcecode;
    
    /**
     * The Language.
     */
    @NonNull
    @JsonProperty("language")
    protected Language language;
    
    /**
     * The Time limit.
     */
    @NonNull
    @JsonProperty("timeLimit")
    protected int timeLimit;
    
    /**
     * The Memory limit.
     */
    @NonNull
    @JsonProperty("memoryLimit")
    protected int memoryLimit;
    
    /**
     * The Test cases.
     */
    @NonNull
    @JsonProperty("testCases")
    protected LinkedHashMap<String, TestCase> testCases; // Note: test cases should be given in order
    
    /**
     * Gets source code.
     *
     * @return the source code
     * @throws IOException the io exception
     */
//    public MultipartFile getSourcecodeFile() throws IOException {
//        return new MockMultipartFile(
//                language.getDefaultSourcecodeFileName(),
//                language.getDefaultSourcecodeFileName(),
//                null,
//                new ByteArrayInputStream(this.sourcecode.getBytes()));
//    }
//    
    /**
     * Gets test cases.
     * This method should be called carefully as it creates a lot of files in memory which have a heavy impact
     * on the memory consumption
     *
     * @return the test cases
     * @throws IOException the io exception
     */
    public List<ConvertedTestCase> getConvertedTestCases() throws IOException {
        return TestCaseMapper.toConvertedTestCases(testCases);
    }
}
