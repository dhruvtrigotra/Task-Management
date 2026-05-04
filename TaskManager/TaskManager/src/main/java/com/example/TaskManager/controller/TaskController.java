package com.example.TaskManager.controller;

import com.example.TaskManager.dto.UpdateStatusRequest;
import com.example.TaskManager.entity.Task;
import com.example.TaskManager.entity.TaskStatus;
import com.example.TaskManager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    // Create task
    @PostMapping
    public Task createTask(
            @RequestBody Task task,
            @RequestParam Long projectId
    ) {
        return taskService.createTask(task, projectId);
    }

    // Get tasks by project
    @GetMapping("/project/{projectId}")
    public List<Task> getTasks(@PathVariable Long projectId) {
        return taskService.getTasksByProject(projectId);
    }

    @GetMapping("/dashboard/total/{projectId}")
    public long getTotalTasks(@PathVariable Long projectId) {
        return taskService.getTotalTasks(projectId);
    }
    @GetMapping("/dashboard/completed/{projectId}")
    public long getCompleted(@PathVariable Long projectId) {
        return taskService.getCompletedTasks(projectId);
    }

    @GetMapping("/dashboard/pending/{projectId}")
    public long getPending(@PathVariable Long projectId) {
        return taskService.getPendingTasks(projectId);
    }
    // Update status
//    @PutMapping("/{taskId}/status")
//    public Task updateStatus(
//            @PathVariable Long taskId,
//            @RequestBody UpdateStatusRequest request
//    ) {
//        return taskService.updateStatus(taskId, request.getStatus());
//    }
//    @PutMapping("/{taskId}/status")
//    public String updateStatus(@PathVariable Long taskId,
//                               @RequestParam TaskStatus status) {
//        return taskService.updateStatus(taskId, status);
//    }

    @PutMapping("/{taskId}/status")
    public Task updateStatus(@PathVariable Long taskId,
                             @RequestParam TaskStatus status) {
        return taskService.updateStatus(taskId, status);
    }

    // Delete task
    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
    }
}