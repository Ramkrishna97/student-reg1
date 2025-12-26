import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { StudentService } from './student.service';
import { Student } from './student.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Student Management System';
  students: Student[] = [];
  newStudent: Student = { id: 0, name: '', age: 0 };
  selectedStudent: Student | null = null;
  searchId: number | null = null;
  errorMessage: string = ''; // ADD THIS LINE

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  // Get all students
  getAllStudents(): void {
    this.errorMessage = ''; // Clear error
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        console.log('Students loaded:', data);
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.errorMessage = 'Failed to load students. Make sure backend is running on http://localhost:8080';
      }
    });
  }

  // Save new student
  saveStudent(): void {
    if (!this.newStudent.name || this.newStudent.name.trim() === '') {
      this.errorMessage = 'Please enter a valid name';
      return;
    }

    if (!this.newStudent.age || this.newStudent.age <= 0 || this.newStudent.age > 100) {
      this.errorMessage = 'Please enter a valid age (1-100)';
      return;
    }

    this.errorMessage = ''; // Clear error
    this.studentService.saveStudent(this.newStudent).subscribe({
      next: (data) => {
        this.students.push(data);
        this.newStudent = { id: 0, name: '', age: 0 };
        alert('Student saved successfully!');
        this.getAllStudents(); // Refresh list
      },
      error: (error) => {
        console.error('Error saving student:', error);
        this.errorMessage = 'Failed to save student. Check if backend is running.';
      }
    });
  }

  // Find student by ID
  findStudentById(): void {
    if (!this.searchId || this.searchId <= 0) {
      this.errorMessage = 'Please enter a valid ID (positive number)';
      return;
    }

    this.errorMessage = ''; // Clear error
    this.studentService.getStudentById(this.searchId).subscribe({
      next: (data) => {
        this.selectedStudent = data;
      },
      error: (error) => {
        console.error('Error finding student:', error);
        this.errorMessage = `Student not found with ID: ${this.searchId}`;
        this.selectedStudent = null;
      }
    });
  }

  // Clear error message
  clearError(): void {
    this.errorMessage = '';
  }
}