package com.example.TaskManager.repository;

import com.example.TaskManager.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    // 🔥 Owner-based (optional, you already had this)
    List<Project> findByOwner_Id(Long ownerId);

    // 🔥 MAIN QUERY (owner + member)
    @Query("""
        SELECT DISTINCT p FROM Project p
        LEFT JOIN p.members m
        WHERE p.owner.id = :userId OR m.id = :userId
    """)
    List<Project> findProjectsForUser(@Param("userId") Long userId);
}