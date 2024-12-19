package com.bytevoyage.kfz.web.rest.vm;

import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.*;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.Comparator;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/gcs")
public class BookResource {
    private final Storage storage;

    public BookResource() {
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

    @PostMapping("/create-bucket")
    public String createBucket(@RequestParam(defaultValue = "book_application_test1") String bucketName,
                               @RequestParam(defaultValue = "STANDARD") String storageClass,
                               @RequestParam(defaultValue = "asia") String location) {
        try {
            // Create the bucket with the provided name, storage class, and location
            //  Bucket bucket = storage.create(Bucket.newBuilder(bucketName)
            //   .setLocation(location)
            // .setStorageClass(StorageClass.valueOf(storageClass))
            //.build());
            return "successfully created.";
            // return "Bucket '" + bucket.getName() + "' successfully created.";
        } catch (Exception e) {
            return "Error creating bucket: " + e.getMessage();
        }
    }

    @PostMapping("/create-user-folder")
    public String createUserFolder(@RequestParam String userId, @RequestParam String bucketName) {
        try {
            // Define the path to the subfolder and then the user-specific folder
            String subfolderPath = "library/"; // Replace "subfolder" with your actual subfolder name
            String folderName = subfolderPath + "library_" + userId + "/";

            // Check if the folder already exists
            //  if (storage.get(bucketName, folderName) != null) {
            //    return "Folder '" + folderName + "' already exists in bucket '" + bucketName + "'.";
            //  }

            // Create an empty blob to simulate folder creation
            // BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, folderName).build();
            // storage.create(blobInfo);
            return "within the subfolder.";
            // return "Folder '" + folderName + "' created in bucket '" + bucketName + "' within the subfolder.";
        } catch (Exception e) {
            return "Error creating folder: " + e.getMessage();
        }
    }

    @GetMapping("/pages")
    public List<String> getPages(
        @RequestParam String userId,
        @RequestParam (defaultValue = "1") int pageNumber,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        String bucketName = "book_application";
        // Replace with your bucket name
        userId="5ccl8yOZicftkSQyzrHhtL0HhFD3";
        return fetchPages(userId);
    }

    public List<String> fetchPages(String userId) {
        List<String> fileUrls = new ArrayList<>();
        String bucketName = "book_application";
        String folderPath = "library/library_" + userId + "/firstbook/1/";
        Bucket bucket = storage.get(bucketName); for (Blob blob : bucket.list(Storage.BlobListOption.prefix(folderPath)).iterateAll()) {
            if (!blob.isDirectory() && blob.getName().endsWith(".webp")) { fileUrls.add(blob.getMediaLink()); } }
        return fileUrls; }
}
