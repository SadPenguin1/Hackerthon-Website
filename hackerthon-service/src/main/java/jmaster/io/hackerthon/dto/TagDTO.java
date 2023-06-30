package jmaster.io.hackerthon.dto;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class TagDTO {
    private Integer id;
    private String title;
    private Date createdAt;
    private String description;
}