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
import com.examly.springapp.model.Opportunity;
import com.examly.springapp.service.OpportunityService;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OpportunityController {

    @Autowired
    OpportunityService opportunityService;

    @GetMapping(value="/crm/opportunity")
    public List<Opportunity> getOpportunity(){
        return opportunityService.getOpportunity();
    }

    @GetMapping(value="/crm/opportunity/{id}")
    public Opportunity getCustomerById(@PathVariable("id")Long opportunityId){
        return opportunityService.getOpportunityById(opportunityId);
    }

    @PostMapping(value="/crm/opportunity")
    public Opportunity addOpportunity(@RequestBody Opportunity newOpportunity){
        return opportunityService.addOpportunity(newOpportunity);
    }

    @PutMapping(value="/crm/opportunity/{id}")
    public String updateOpportunity(@PathVariable("id")Long opportunityId,@RequestBody Opportunity UpdatedOpportunity){
        return opportunityService.updateOpportunity(opportunityId,UpdatedOpportunity);
    }

    @DeleteMapping(value="/crm/opportunity/{id}")
    public String deleteOpportunityById(@PathVariable("id") Long OpportunityId){
        return opportunityService.deleteOpportunityById(OpportunityId);
    }
}
