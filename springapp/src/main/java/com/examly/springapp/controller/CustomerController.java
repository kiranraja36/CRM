package com.examly.springapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.examly.springapp.service.CustomerService;
import com.examly.springapp.model.Customer;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {                                           

    @Autowired
    CustomerService customerService;

    @GetMapping(value="/crm/customer")
    public List<Customer> getCustomer(){
        return customerService.getCustomer();
    }

    @GetMapping(value="/crm/customer/{id}")
    public Customer getCustomerById(@PathVariable("id")Long customerId){
        return customerService.getCustomerById(customerId);
    }

    @PostMapping(value="/crm/customer")
    public Customer addCustomer(@RequestBody Customer newCustomer){
        return customerService.addCustomer(newCustomer);
    }

    @PutMapping(value="/crm/customer/{id}")
    public String updateCustomer(@PathVariable("id")Long customerId,@RequestBody Customer updatedCustomer){
        return customerService.updateCustomer(customerId,updatedCustomer);
    }

    @DeleteMapping(value="/crm/customer/{id}")
    public String deleteCustomerById(@PathVariable("id") Long customerId) throws Exception{
        return customerService.deleteCustomerById(customerId);
    }
} 
