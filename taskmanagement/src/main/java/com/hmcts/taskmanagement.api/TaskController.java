package com.hmcts.taskmanagement.api;

import com.hmcts.taskmanagement.api.Task;
import com.hmcts.taskmanagement.api.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TaskController {

    public final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return taskService.getTasks();
    }

    @GetMapping("/task/{id}")
    public Task getTasks(@PathVariable("id") Long id) {
        return taskService.getTaskById(id);
    }

    @PutMapping("/task/{id}")
    public Task updateTask(@RequestBody Task task, @PathVariable("id") Long id) {
        return taskService.updateTask(task);
    }

    @PostMapping("/task/add")
    public ResponseEntity<Task> addNew(@RequestBody Task task) {
        Task newTask = taskService.addTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTask);
    }

    @DeleteMapping("/task/{id}")
    public void deleteTask(@PathVariable("id") Long id) {
        taskService.deleteTask(id);
    }

}
