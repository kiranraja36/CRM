package com.examly.springapp.model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    private String phone;
    private String address;

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL,targetEntity = Sale.class)
    @JsonIgnoreProperties({"customer","opportunity"})
    @Column(name="purchase_history")
    private List<Sale> purchaseHistory;

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL,targetEntity = Ticket.class)
    @JsonIgnoreProperties({"customer"})
    @Column(name="communication_history")
    private List<Ticket> communicationHistory;

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL,targetEntity = Opportunity.class)
    @JsonIgnoreProperties({"customer"})
    @Column(name="opportunity_history")
    @JsonBackReference
    private List<Opportunity> opportunityHistory;
    
}
