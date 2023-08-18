
package com.examly.springapp.model;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="sale")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name="customer_id",referencedColumnName = "id")
    @JsonIgnoreProperties({"purchaseHistory","communicationHistory","opportunityHistory"})
    private Customer customer;

    @ManyToOne
    @JoinColumn(name="opportunity_id",referencedColumnName = "id")
    @JsonIgnoreProperties({"customer"})
    private Opportunity opportunity;
    
    private Double amount;
    private LocalDateTime date;
    private String notes;

    
    @PrePersist
    public void onSave(){
        LocalDateTime currenDateTime=LocalDateTime.now();
        this.date=currenDateTime;
    }
}
