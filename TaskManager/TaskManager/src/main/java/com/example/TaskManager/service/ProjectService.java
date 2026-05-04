package com.example.TaskManager.service;

import com.example.TaskManager.entity.Project;
import com.example.TaskManager.entity.User;
import com.example.TaskManager.repository.ProjectRepository;
import com.example.TaskManager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public Project createProject(Project project, Long ownerId) {

        if (ownerId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ownerId is required");
        }

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner not found")
                );

        project.setOwner(owner);

        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getProjectsForUser(Long userId) {
        return projectRepository.findProjectsForUser(userId);
    }
//    public List<Project> getProjectsByOwner(Long ownerId) {
//
//        User owner = userRepository.findById(ownerId)
//                .orElseThrow(() ->
//                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner not found")
//                );
//
//        return projectRepository.findByOwner_Id(owner.getId());
//    }

    public Project updateProject(Long projectId, Project updatedProject, Long userId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));

        // 🔒 ownership check
        if (!project.getOwner().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot update this project");
        }

        project.setName(updatedProject.getName());
        project.setDescription(updatedProject.getDescription());

        return projectRepository.save(project);
    }

    public void deleteProject(Long projectId, Long userId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));

        // 🔒 ownership check
        if (!project.getOwner().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot delete this project");
        }

        projectRepository.delete(project);
    }

//    public String addMember(Long projectId, Long userId) {
//
//        Project project = projectRepository.findById(projectId)
//                .orElseThrow(() -> new RuntimeException("Project not found"));
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        project.getMembers().add(user);
//
//        projectRepository.save(project);
//
//        return "Member added";
//    }

    public void addMember(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        project.getMembers().add(user);
        projectRepository.save(project);
    }
}