package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Task;
import com.examly.springapp.repository.TaskRepository;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;

    public Task addTask(Task newTask) {
        return taskRepository.save(newTask);
    }

    public Task getTaskById(Long taskId){
        return taskRepository.findById(taskId).orElse(null);
    }

    public List<Task> getTask() {
        return taskRepository.findAll();
    }

    public String updateTask(Long taskId,Task updatedTask) {
        Task task=taskRepository.findById(taskId).orElse(null);

        if(task==null)
        {
            return "Task not Found";
        }
        Optional.ofNullable(updatedTask.getName())
            .ifPresent(task::setName);

        Optional.ofNullable(updatedTask.getDescription())
            .ifPresent(task::setDescription);

        Optional.ofNullable(updatedTask.getAssignedTo())
            .ifPresent(task::setAssignedTo);

        Optional.ofNullable(updatedTask.getDueDate())
            .ifPresent(task::setDueDate);

        Optional.ofNullable(updatedTask.getCreatedAt())
            .ifPresent(task::setCreatedAt);

        Optional.ofNullable(updatedTask.getCompletedAt())
            .ifPresent(task::setCompletedAt);

        Optional.ofNullable(updatedTask.getUpdatedAt())
            .ifPresent(task::setUpdatedAt);        

        taskRepository.save(task);
        return "Task Updated Successfully";
    }

    public String deleteTaskById(Long taskId) {
        taskRepository.deleteById(taskId);
        return "Task Deleted Successfully";
    }    
}
