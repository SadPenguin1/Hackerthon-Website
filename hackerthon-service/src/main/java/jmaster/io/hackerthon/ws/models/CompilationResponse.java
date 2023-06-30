package jmaster.io.hackerthon.ws.models;

import lombok.Builder;

import lombok.EqualsAndHashCode;
import lombok.Getter;

/**
 * The type Compilation response.
 *
 * @author Zakaria Maaraki
 */
@Getter
@EqualsAndHashCode
@Builder
public class CompilationResponse {
    
    private Verdict verdict;
    
    private int compilationDuration;
    
    private String error;
}
