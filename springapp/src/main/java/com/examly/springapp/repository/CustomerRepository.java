package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
}

