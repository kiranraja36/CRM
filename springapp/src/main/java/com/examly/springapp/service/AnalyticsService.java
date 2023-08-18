package com.examly.springapp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.DTO.OpportunityAnalyticsDTO;
import com.examly.springapp.DTO.TicketAnalyticsDTO;
import com.examly.springapp.controller.EmailController;
import com.examly.springapp.sms.SMSController; 
import com.examly.springapp.enumeration.OpportunityStatus;
import com.examly.springapp.enumeration.TicketStatus;
import com.examly.springapp.repository.OpportunityRepository;
import com.examly.springapp.repository.SaleRepository;
import com.examly.springapp.repository.TicketRepository;

@Service
public class AnalyticsService {
    @Autowired
    SaleRepository saleRepository;

    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    OpportunityRepository opportunityRepository;

    @Autowired
    EmailController emailController;

    @Autowired
    SMSController smsController;

    public List<Object[]> getTotalSalesAmountPerMonth() {
        List<Object[]> sales=saleRepository.getTotalSalesAmountPerMonth();
        return sales;
    }

    public TicketAnalyticsDTO calculateTicketAnalytics() {
        long totalTickets = ticketRepository.count();
        long openTickets = ticketRepository.countByStatus(TicketStatus.OPEN);
        long assignedTickets = ticketRepository.countByStatus(TicketStatus.ASSIGNED);
        long resolvedTickets = ticketRepository.countByStatus(TicketStatus.RESOLVED);
        long reopenedTickets = ticketRepository.countByStatus(TicketStatus.REOPENED);

        return new TicketAnalyticsDTO(totalTickets, openTickets, assignedTickets, resolvedTickets, reopenedTickets);
    }

    public int getSaleThisMonth(){
        return saleRepository.noOfSalesThisMonth();
    }

    public int emailCount(){
        return emailController.emailCount();
    }

    public int smsCount(){
        return smsController.smsCount();
    }

    public OpportunityAnalyticsDTO calculateOpportunityAnalytics() {
        long totalOpportunity = opportunityRepository.count();
        long open = opportunityRepository.countByStatus(OpportunityStatus.OPEN);
        long needAnalysis = opportunityRepository.countByStatus(OpportunityStatus.NEED_ANALYSIS);
        long proposal = opportunityRepository.countByStatus(OpportunityStatus.PROPOSAL);
        long negotiation = opportunityRepository.countByStatus(OpportunityStatus.NEGOTIATION);
        long upsell = opportunityRepository.countByStatus(OpportunityStatus.UPSELL);
        long closedWin = opportunityRepository.countByStatus(OpportunityStatus.CLOSED_WIN);
        long closedLoss = opportunityRepository.countByStatus(OpportunityStatus.CLOSED_LOSS);

        return new OpportunityAnalyticsDTO(totalOpportunity, open, needAnalysis, proposal, negotiation, upsell, closedWin, closedLoss);
    }
}
