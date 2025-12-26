package com.example.studentapp.controller;

import com.example.studentapp.model.Student;
import com.example.studentapp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService service;

    @PostMapping("/save")
    public void save(@RequestBody Student student){
        service.save(student);
    }
    @GetMapping("/find/{id}")
    public Student findById(int id) {
        return service.findById(id);
    }
    @GetMapping("/all")
    public List<Student> findAll(){
        return service.findAll();
    }
}
