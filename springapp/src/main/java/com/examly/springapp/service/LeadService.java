package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Lead;
import com.examly.springapp.repository.LeadRepository;

@Service
public class LeadService {
    
    @Autowired
    LeadRepository LeadRepository;

    public Lead addLead(Lead newLead) {
        return LeadRepository.save(newLead);
    }

    public Lead getLeadById(Long LeadId){
        return LeadRepository.findById(LeadId).orElse(null);
    }

    public List<Lead> getLead() {
        return LeadRepository.findAll();
    }

    public String updateLead(Long LeadId,Lead updatedLead) {
        Lead Lead=LeadRepository.findById(LeadId).orElse(null);

        if(Lead==null)
        {
            return "Lead not Found";
        }
        Optional.ofNullable(updatedLead.getEmail())
            .ifPresent(Lead::setEmail);

        Optional.ofNullable(updatedLead.getName())
            .ifPresent(Lead::setName);

        Optional.ofNullable(updatedLead.getPhone())
            .ifPresent(Lead::setPhone);

        Optional.ofNullable(updatedLead.getSource())
            .ifPresent(Lead::setSource);

        Optional.ofNullable(updatedLead.getStatus())
            .ifPresent(Lead::setStatus);

        Optional.ofNullable(updatedLead.getNotes())
            .ifPresent(Lead::setNotes);

        LeadRepository.save(Lead);
        return "Lead Updated Successfully";
    }

    public String deleteLeadById(Long LeadId) {
        LeadRepository.deleteById(LeadId);
        return "Lead Deleted Successfully";
    }
}
