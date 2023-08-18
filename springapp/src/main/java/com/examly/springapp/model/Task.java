
package com.examly.springapp.model;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PostPersist;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    @JsonIgnoreProperties({"password","conformPassword"})
    private User assignedTo;//User

    @Column(name="due_date")
    private LocalDateTime dueDate;

    @Column(name="completed_at")
    private LocalDateTime completedAt;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    
    @PrePersist
    public void onSave(){
        LocalDateTime currenDateTime=LocalDateTime.now();
        this.createdAt=currenDateTime;
        this.updatedAt=currenDateTime;
    }

    @PostPersist
    public void onUpdate(){
        LocalDateTime currenDateTime=LocalDateTime.now();
        this.updatedAt=currenDateTime;
    }
}
