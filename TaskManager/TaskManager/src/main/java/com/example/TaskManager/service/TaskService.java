package com.example.TaskManager.service;

import com.example.TaskManager.entity.Project;
import com.example.TaskManager.entity.Task;
import com.example.TaskManager.entity.TaskStatus;
import com.example.TaskManager.repository.ProjectRepository;
import com.example.TaskManager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public Task createTask(Task task, Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));

        task.setProject(project);
        task.setStatus(TaskStatus.TODO); // default

        return taskRepository.save(task);
    }

    public List<Task> getTasksByProject(Long projectId) {
        return taskRepository.findByProjectIdOrderByCreatedAtDesc(projectId);

    }
    public long getTotalTasks(Long projectId) {
        return taskRepository.countByProject_Id(projectId);
    }
    public long getCompletedTasks(Long projectId) {
        return taskRepository.countByProject_IdAndStatus(projectId, TaskStatus.DONE);
    }

    public long getPendingTasks(Long projectId) {
        return taskRepository.countByProject_IdAndStatus(projectId, TaskStatus.TODO);
    }

    public Task updateStatus(Long taskId, TaskStatus taskStatus) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Task not found"
                ));

        // update status
        task.setStatus(taskStatus);

        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}