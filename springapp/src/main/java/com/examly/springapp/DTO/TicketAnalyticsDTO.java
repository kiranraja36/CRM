package com.examly.springapp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketAnalyticsDTO {
    private long totalTickets;
    private long openTickets;
    private long assignedTickets;
    private long resolvedTickets;
    private long reopenedTickets;
}
    
