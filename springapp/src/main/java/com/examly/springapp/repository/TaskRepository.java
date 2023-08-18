package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.Task;

public interface TaskRepository extends JpaRepository<Task,Long>{ 
}
