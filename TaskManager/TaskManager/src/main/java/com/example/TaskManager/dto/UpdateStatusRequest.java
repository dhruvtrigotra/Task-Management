package com.example.TaskManager.dto;

import com.example.TaskManager.entity.TaskStatus;
import lombok.Data;

@Data
public class UpdateStatusRequest {
    private TaskStatus status;
}