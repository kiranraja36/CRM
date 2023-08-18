package com.examly.springapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.examly.springapp.model.Task;
import com.examly.springapp.service.TaskService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    @Autowired
    TaskService taskService;

    @GetMapping(value="/crm/task")
    public List<Task> getTask(){
        return taskService.getTask();
    }

    @GetMapping(value="/crm/task/{id}")
    public Task getTaskById(@PathVariable("id")Long taskId){
        return taskService.getTaskById(taskId);
    }

    @PostMapping(value="/crm/task")
    public Task addTask(@RequestBody Task newTask){
        return taskService.addTask(newTask);
    }

    @PutMapping(value="/crm/task/{id}")
    public String updateTask(@PathVariable("id")Long taskId,@RequestBody Task UpdatedTask){
        return taskService.updateTask(taskId,UpdatedTask);
    }


    @DeleteMapping(value="/crm/task/{id}")
    public String deleteTaskById(@PathVariable("id") Long taskId){
        return taskService.deleteTaskById(taskId);
    }
}
