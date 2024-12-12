package com.thecodereveal.shopease.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/uploads")
public class ImageUploadController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/images")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            if (!isImageFile(file)) {
                return ResponseEntity.badRequest().body("Only image files are allowed");
            }

            // Save the file to the directory
            String filePath = saveImage(file);
            System.out.println("filePath: " + filePath);
            // Return the public URL or success message
            return ResponseEntity.ok(filePath);
        } catch (IOException e) {
            // Log error for debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }

    private String saveImage(MultipartFile file) throws IOException {
        // Define the folder where you want to save images
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs(); // Creates the directory if it doesn't exist
        }

        // Generate a unique file name using UUID to avoid conflicts
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = getFileExtension(originalFileName);
        String fileName = UUID.randomUUID().toString() + "." + fileExtension;

        Path path = Paths.get(uploadDir, fileName);

        // Save the file
        file.transferTo(path);

        // Return the relative URL for access
        return "/uploads/" + fileName;
    }

    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (contentType.startsWith("image/"));
    }

    private String getFileExtension(String fileName) {
        if (fileName != null && fileName.contains(".")) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        }
        return "jpg"; // Default to jpg if no extension found
    }
}
