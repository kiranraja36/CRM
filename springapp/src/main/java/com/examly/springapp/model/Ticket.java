package com.examly.springapp.model;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import com.examly.springapp.enumeration.TicketStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="ticket")
public class Ticket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id",referencedColumnName ="id")
    @JsonIgnoreProperties({"purchaseHistory","communicationHistory","opportunityHistory"})
    private Customer customer;

    private String subject;
    private String description;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    @JsonIgnoreProperties({"password","confirmPassword"})
    private User assignedTo;

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

    // @PreUpdate
    // public void onUpdate(){
    //     this.updatedAt = LocalDateTime.now();
    // }
}
