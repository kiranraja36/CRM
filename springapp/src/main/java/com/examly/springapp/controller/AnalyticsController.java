package com.examly.springapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.DTO.OpportunityAnalyticsDTO;
import com.examly.springapp.DTO.TicketAnalyticsDTO;
import com.examly.springapp.service.AnalyticsService;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {

    @Autowired
    AnalyticsService analyticsService;

    @GetMapping("/analytics/totalSalesPerMonth")
    public List<Object[]> getSalesAnalytics() {
        return analyticsService.getTotalSalesAmountPerMonth();
    }

    @GetMapping("/analytics/ticketStatus")
    public TicketAnalyticsDTO getTicketAnalytics() {
        return analyticsService.calculateTicketAnalytics();
    }

    @GetMapping(value="/analytics/salesThisMonth")
    public int getSaleThisMonth() {
        return analyticsService.getSaleThisMonth();
    }

    @GetMapping("/analytics/emailCount")
    public int emailCount(){
        return analyticsService.emailCount();
    }
    
    @GetMapping(value="/analytics/smsCount")
    public int smsCount(){
        return analyticsService.smsCount();
    }

    @GetMapping("/analytics/opportunityStatus")
    public OpportunityAnalyticsDTO getOpportunityAnalytics() {
        return analyticsService.calculateOpportunityAnalytics();
    }
}
