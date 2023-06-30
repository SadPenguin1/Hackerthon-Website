package jmaster.io.hackerthon.api;

import java.io.Console;
import java.io.IOException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import jmaster.io.hackerthon.dto.AnswerDTO;
import jmaster.io.hackerthon.dto.ResponseDTO;
import jmaster.io.hackerthon.entity.Answer;
import jmaster.io.hackerthon.entity.Exercise;
import jmaster.io.hackerthon.repository.AnswerRepo;
import jmaster.io.hackerthon.repository.ExerciseRepo;
import jmaster.io.hackerthon.ws.CheckCodeDTO;
import jmaster.io.hackerthon.ws.ResultDTO;
import jmaster.io.hackerthon.ws.TestCase;
import jmaster.io.hackerthon.ws.models.Request;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/checkcode")
public class CheckCodeAPIController {

	@Autowired
	AnswerRepo anwserRepo;
	
	@Autowired
	ExerciseRepo exerciseRepo;

	@PostMapping("/")
	public ResultDTO checkCode(@RequestBody CheckCodeDTO checkCodeDTO) throws IOException {

		// CheckCodeDTO checkCodeDTO = new CheckCodeDTO();
		// checkCodeDTO.setLanguage("JAVA");
		// System.out.println(checkCodeDTO.getLanguage());
		// checkCodeDTO.setMemoryLimit(1500);
		// System.out.println(checkCodeDTO.getMemoryLimit());
//		checkCodeDTO.setSourcecode("")

		Map<String, TestCase> testCases = new LinkedHashMap<>();
		TestCase testCase = new TestCase();
		// testCase.setExpectedOutput("5");
		// System.out.println(testCase.getExpectedOutput());
		// testCase.setInput("3 2");
		// System.out.println(testCase.getInput());
		testCases.put("additionalProp1", testCase);

		// checkCodeDTO.setTimeLimit(15);
		// System.out.println(checkCodeDTO.getTimeLimit());
		// checkCodeDTO.getTestCases(testCase);

		RestTemplate restTemplate = new RestTemplate();

//		Set<HttpMethod> optionsForAllow = restTemplate.optionsForAllow("http://13.115.168.2//api/compile/json");
//		HttpMethod[] supportedMethods
//		  = {HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<CheckCodeDTO> request = new HttpEntity<>(checkCodeDTO, headers);
		ResponseEntity<ResultDTO> response = restTemplate.exchange("http://103.176.179.140//api/compile/json",
				HttpMethod.POST, request, ResultDTO.class);

		ResultDTO rs = response.getBody();
		
		Answer answer = new Answer();
		answer.setLanguage(rs.getLanguage());
		answer.setVerdict(rs.getVerdict());
		answer.setAverageExecutionDuration((int)rs.getAverageExecutionDuration());
		
		answer.setCreateAt(LocalDateTime.parse(rs.getDateTime())
			    .atZone(ZoneId.of("UTC"))
			    .withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"))
			    .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
		
		answer.setUserAnswer(checkCodeDTO.getSourcecode());
		
		Exercise exercise = exerciseRepo.findById(checkCodeDTO.getExercise().getId()).orElse(null);
	    answer.setExercise(exercise);
		

		anwserRepo.save(answer);

		return rs;

	}

}
