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
import com.examly.springapp.model.Ticket;
import com.examly.springapp.service.TicketService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {

    @Autowired
    TicketService ticketService;

    @GetMapping(value="/crm/ticket")
    public List<Ticket> getTicket(){
        return ticketService.getTicket();
    }

    @GetMapping(value="/crm/ticket/{id}")
    public Ticket getTicketById(@PathVariable("id")Long TicketId){
        return ticketService.getTicketById(TicketId);
    }

    @PostMapping(value="/crm/ticket")
    public Ticket addTicket(@RequestBody Ticket newTicket){
        return ticketService.addTicket(newTicket);
    }
    
    @PutMapping(value="/crm/ticket/{id}")
    public String updateTicket(@PathVariable("id")Long ticketId,@RequestBody Ticket UpdatedTicket){
        return ticketService.updateTicket(ticketId,UpdatedTicket);
    }

    @DeleteMapping(value="/crm/ticket/{id}")
    public String deleteTicketById(@PathVariable("id") Long ticketId){
        return ticketService.deleteTicketById(ticketId);
    }

    @GetMapping(value="/crm/ticket/communicationHistory/{id}")
    public List<Ticket> communicationHistory(@PathVariable("id")Long customerId){
        return ticketService.communicationHistory(customerId);
    }
}
