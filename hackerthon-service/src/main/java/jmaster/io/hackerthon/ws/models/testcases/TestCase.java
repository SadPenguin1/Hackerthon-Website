package jmaster.io.hackerthon.ws.models.testcases;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

/**
 * The Test case class.
 *
 * @author Zakaria Maaraki
 */
@Getter
@AllArgsConstructor
@EqualsAndHashCode
public class TestCase {

    @JsonProperty("input")
    private String input;
    
    @NonNull
    @JsonProperty("expectedOutput")
    private String expectedOutput;
}
