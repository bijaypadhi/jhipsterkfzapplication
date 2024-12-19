package com.bytevoyage.kfz.web.rest.vm;

import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * CanvasControllerResource controller
 */
@RestController
@RequestMapping("/api/gcp")
public class CanvasControllerResource {
    private final Storage storage;
    private final Logger log = LoggerFactory.getLogger(CanvasControllerResource.class);

    private String bucketName="paintcanvas_bucket";
    public CanvasControllerResource() {
        try {
            // Load service account key from JSON file
            String serviceAccountKeyFilePath = "kfzgroup-servicekey.json"; // Update with your file path
            this.storage = StorageOptions.newBuilder()
                .setCredentials(ServiceAccountCredentials.fromStream(new FileInputStream(serviceAccountKeyFilePath)))
                .build()
                .getService();
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize Google Cloud Storage", e);
        }
    }

    /**
     * POST saveCanvas
     */
    @PostMapping("/save-canvas")
    public ResponseEntity<Map<String, String>> saveToGCP(
        @RequestParam("userId") String userId,
        @RequestParam("file") MultipartFile file) {

        String bucketName = "paintcanvas_bucket";
        String folderPath = "CanvasLib/Lib_" + userId + "/";
        try {
            // Build the object name with folder path
            String objectName = folderPath + file.getOriginalFilename();

            // Upload the file to GCP bucket
            Blob blob = storage.create(
                BlobInfo.newBuilder(bucketName, objectName).build(),
                file.getBytes()
            );

            Map<String, String> response = new HashMap<>();
            response.put("message", "File uploaded successfully!");
            response.put("fileName", blob.getName());
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            // Handle the error and respond with 500 status
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to upload file."));
        }
    }


    /**
     * GET getCanvas
     */
    @GetMapping("/get-canvas")
    public List<String> getCanvas(
        @RequestParam String userId

    ) {

        userId="5ccl8yOZicftkSQyzrHhtL0HhFD3";
        return fetchPages(userId);
    }


    public List<String> fetchPages(String userId) {
        List<String> fileUrls = new ArrayList<>();
        String bucketName = "paintcanvas_bucket";
        String folderPath = "CanvasLib/Lib_" + userId + "/";
        Bucket bucket = storage.get(bucketName); for (Blob blob : bucket.list(Storage.BlobListOption.prefix(folderPath)).iterateAll()) {
            if (!blob.isDirectory() && blob.getName().endsWith(".jpg")) { fileUrls.add(blob.getMediaLink()); } }
        return fileUrls; }
    /**
     * GET getAllCanvas
     */
    @GetMapping("/get-all-canvas")
    public String getAllCanvas() {
        return "getAllCanvas";
    }
}
