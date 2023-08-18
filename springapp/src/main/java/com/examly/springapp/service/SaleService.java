package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import com.examly.springapp.model.Sale;
import com.examly.springapp.repository.SaleRepository;

@Service
public class SaleService {

    @Autowired
    SaleRepository saleRepository;

    public List<Sale> getSale(){
        return saleRepository.findAll();
    }

    public Sale getSaleById(Long saleId){
        return saleRepository.findById(saleId).orElse(null);
    }

    public Sale addSale(@RequestBody Sale newSale){
        return saleRepository.save(newSale);
    }

    public String updateSale(Long saleId,Sale updatedSale) {
        Sale sale=saleRepository.findById(saleId).orElse(null);

        if(sale==null)
        {
            return "Sale not Found";
        }
        Optional.ofNullable(updatedSale.getName())
            .ifPresent(sale::setName);

        Optional.ofNullable(updatedSale.getCustomer())
            .ifPresent(sale::setCustomer);

        Optional.ofNullable(updatedSale.getOpportunity())
            .ifPresent(sale::setOpportunity);

        Optional.ofNullable(updatedSale.getNotes())
            .ifPresent(sale::setNotes);

        Optional.ofNullable(updatedSale.getAmount())
            .ifPresent(sale::setAmount);

        Optional.ofNullable(updatedSale.getDate())
            .ifPresent(sale::setDate);

        saleRepository.save(sale);
        return "Sale Updated Successfully";
    }

    public String deleteSaleById(Long saleId) {
        saleRepository.deleteById(saleId);
        return "Sale Deleted Successfully";
    }

    public List<Sale> purchaseHistory(Long customerId) {
        return saleRepository.findByCustomerId(customerId);
    }
}
