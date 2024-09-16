package com.bytevoyage.kfz.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class BookController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/call-okuma-reader/{userId}")
    public String callBookWriter(@PathVariable String userId) {
        String url = "http://127.0.0.1:8000/Okuma-Reader?userId=" + userId;
        return restTemplate.getForObject(url, String.class);
    }
}
