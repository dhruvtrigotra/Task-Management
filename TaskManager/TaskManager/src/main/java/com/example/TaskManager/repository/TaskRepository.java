package com.example.TaskManager.repository;

import com.example.TaskManager.entity.Task;
import com.example.TaskManager.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    long countByProject_Id(Long projectId);
    long countByProject_IdAndStatus(Long projectId, TaskStatus status);
    List<Task> findByProjectIdOrderByCreatedAtDesc(Long projectId);
}