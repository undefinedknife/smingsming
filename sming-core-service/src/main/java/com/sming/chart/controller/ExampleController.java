package com.sming.chart.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExampleController {

    @RequestMapping(value = "/ex", produces = MediaType.TEXT_PLAIN_VALUE)
    public String ex() {
        return "example";
    }
}
