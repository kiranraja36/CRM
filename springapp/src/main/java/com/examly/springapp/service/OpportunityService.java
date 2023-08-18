package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Opportunity;
import com.examly.springapp.repository.OpportunityRepository;

@Service
public class OpportunityService {

    @Autowired
    OpportunityRepository opportunityRepository;

    public Opportunity getOpportunityById(Long opportunityId){
        return opportunityRepository.findById(opportunityId).orElse(null);
    }

    public List<Opportunity> getOpportunity() {
        return opportunityRepository.findAll();
    }

    public Opportunity addOpportunity(Opportunity newOpportunity){
        return opportunityRepository.save(newOpportunity);
    }

    public String updateOpportunity(Long opportunityId,Opportunity updatedOpportunity) {
        Opportunity opportunity=opportunityRepository.findById(opportunityId).orElse(null);

        if(opportunity==null)
        {
            return "Opportunity not Found";
        }    
        Optional.ofNullable(updatedOpportunity.getName())
            .ifPresent(opportunity::setName);

        Optional.ofNullable(updatedOpportunity.getValue())
            .ifPresent(opportunity::setValue);

        Optional.ofNullable(updatedOpportunity.getStatus())
            .ifPresent(opportunity::setStatus);

        Optional.ofNullable(updatedOpportunity.getNotes())
            .ifPresent(opportunity::setNotes);

        Optional.ofNullable(updatedOpportunity.getCloseDate())
            .ifPresent(opportunity::setCloseDate);

        Optional.ofNullable(updatedOpportunity.getCustomer())
            .ifPresent(opportunity::setCustomer);

        opportunityRepository.save(opportunity);
        return "Opportunity Updated Successfully";
    }

    public String deleteOpportunityById(Long opportunityId) {
        opportunityRepository.deleteById(opportunityId);
        return "Opportunity Deleted Successfully";
    }
}
