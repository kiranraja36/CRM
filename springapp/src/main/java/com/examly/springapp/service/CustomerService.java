package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Customer;
import com.examly.springapp.repository.CustomerRepository;
import com.examly.springapp.exception.ChildClassDeleteException;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    public Customer addCustomer(Customer newCustomer) {
        return customerRepository.save(newCustomer);
    }

    public Customer getCustomerById(Long customerId){
        return customerRepository.findById(customerId).orElse(null);
    }

    public List<Customer> getCustomer() {
        return customerRepository.findAll();
    }

    public String updateCustomer(Long customerId,Customer updatedCustomer) {
        Customer customer=customerRepository.findById(customerId).orElse(null);

        if(customer==null)
        {
            return "Customer not Found";
        }
        Optional.ofNullable(updatedCustomer.getEmail())
            .ifPresent(customer::setEmail);

        Optional.ofNullable(updatedCustomer.getName())
            .ifPresent(customer::setName);

        Optional.ofNullable(updatedCustomer.getAddress())
            .ifPresent(customer::setAddress);

        Optional.ofNullable(updatedCustomer.getPhone())
            .ifPresent(customer::setPhone);

        customerRepository.save(customer);
        return "Customer Updated Successfully";
    }

    public String deleteCustomerById(Long customerId) throws Exception {
        try{
            customerRepository.deleteById(customerId);
            return "Customer Deleted Successfully";
        }catch(Exception e){
            throw new ChildClassDeleteException("Denied for Deletion");
        }
    }
}
