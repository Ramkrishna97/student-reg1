package com.example.studentapp.service;

import com.example.studentapp.model.Student;
import com.example.studentapp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository repo;

    public void save(Student student){
        repo.save(student);
    }
    public Student findById(int id) {
        return repo.findById(id).orElse(null);
    }
    public List<Student> findAll(){
        return repo.findAll();
    }
}
