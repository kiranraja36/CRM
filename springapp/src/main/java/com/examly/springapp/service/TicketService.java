package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Ticket;
import com.examly.springapp.repository.TicketRepository;

@Service
public class TicketService {

    @Autowired
    TicketRepository ticketRepository;

    public List<Ticket> getTicket() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long TicketId){
        return ticketRepository.findById(TicketId).orElse(null);
    }

    public Ticket addTicket(Ticket newTicket) {
        return ticketRepository.save(newTicket);
    }

    public String updateTicket(Long ticketId,Ticket updatedTicket) {
        Ticket ticket=ticketRepository.findById(ticketId).orElse(null);

        if(ticket==null)
        {
            return "Ticket not Found";
        }
        Optional.ofNullable(updatedTicket.getCustomer())
        .ifPresent(ticket::setCustomer);

        Optional.ofNullable(updatedTicket.getSubject())
            .ifPresent(ticket::setSubject);

        Optional.ofNullable(updatedTicket.getDescription())
            .ifPresent(ticket::setDescription);

        Optional.ofNullable(updatedTicket.getStatus())
            .ifPresent(ticket::setStatus);

        Optional.ofNullable(updatedTicket.getAssignedTo())
            .ifPresent(ticket::setAssignedTo);

        Optional.ofNullable(updatedTicket.getCreatedAt())
            .ifPresent(ticket::setCreatedAt);

        Optional.ofNullable(updatedTicket.getUpdatedAt())
            .ifPresent(ticket::setUpdatedAt);

        ticketRepository.save(ticket);
        return "Ticket Updated Successfully";
    }

    public String deleteTicketById(Long ticketId) {
        ticketRepository.deleteById(ticketId);
        return "Ticket Deleted Successfully";
    }

    public List<Ticket> communicationHistory(Long customerId) {
        return ticketRepository.findByCustomerId(customerId);
    }
}
