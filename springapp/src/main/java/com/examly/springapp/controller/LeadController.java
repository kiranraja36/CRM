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
import com.examly.springapp.model.Lead;
import com.examly.springapp.service.LeadService;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LeadController {
    
    @Autowired
    LeadService leadService;

    @GetMapping(value="/crm/lead")
    public List<Lead> getLead(){
        return leadService.getLead();
    }

    @GetMapping(value="/crm/lead/{id}")
    public Lead getLeadById(@PathVariable("id")Long leadId){
        return leadService.getLeadById(leadId);
    }

    @PostMapping(value="/crm/lead")
    public Lead addLead(@RequestBody Lead newLead){
        return leadService.addLead(newLead);
    }

    @PutMapping(value="/crm/lead/{id}")
    public String updateLead(@PathVariable("id")Long leadId,@RequestBody Lead updatedLead){
        return leadService.updateLead(leadId,updatedLead);
    }

    @DeleteMapping(value="/crm/lead/{id}")
    public String deleteLeadById(@PathVariable("id") Long leadId){
        return leadService.deleteLeadById(leadId);
    }
}
