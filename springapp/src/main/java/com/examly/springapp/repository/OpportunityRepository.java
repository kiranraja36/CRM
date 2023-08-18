package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.Opportunity;
import com.examly.springapp.enumeration.OpportunityStatus;

public interface OpportunityRepository extends JpaRepository<Opportunity,Long>{
    long countByStatus(OpportunityStatus status);
}

