package com.examly.springapp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpportunityAnalyticsDTO {
    private long totalOpportunity;
    private long Open;
    private long needAnalysis;
    private long proposal;
    private long negotiation;
    private long upsell;
    private long closedWin;
    private long closedLoss;
}