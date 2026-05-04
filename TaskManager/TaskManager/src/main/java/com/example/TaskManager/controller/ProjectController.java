package com.example.TaskManager.controller;

import com.example.TaskManager.entity.Project;
import com.example.TaskManager.entity.User;
import com.example.TaskManager.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Project createProject(@RequestBody Project project,
                                 Authentication authentication) {

        User user = (User) authentication.getPrincipal();
        assert user != null;
        return projectService.createProject(project, user.getId());
    }

    @PreAuthorize("hasAnyRole('MEMBER','ADMIN')")
    @GetMapping
    public List<Project> getProjects(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return projectService.getProjectsForUser(user.getId());
    }



    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{projectId}")
    public Project updateProject(
            @PathVariable Long projectId,
            @RequestBody Project updatedProject,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        assert user != null;
        return projectService.updateProject(projectId, updatedProject, user.getId());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{projectId}")
    public String deleteProject(
            @PathVariable Long projectId,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        assert user != null;
        projectService.deleteProject(projectId, user.getId());
        return "Project deleted successfully";
    }

//    @PreAuthorize("hasRole('ADMIN')")
//    @PostMapping("/{projectId}/add-member")
//    public String addMember(@PathVariable Long projectId,
//                            @RequestParam Long userId) {
//        return projectService.addMember(projectId, userId);
//    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{projectId}/members/{userId}")
    public ResponseEntity<?> addMember(
            @PathVariable Long projectId,
            @PathVariable Long userId
    ) {
        projectService.addMember(projectId, userId);
        return ResponseEntity.ok("Member added");
    }

}