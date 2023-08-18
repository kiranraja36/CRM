package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Lead;

public interface LeadRepository extends JpaRepository<Lead,Long>{
    
}


