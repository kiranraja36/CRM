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
import com.examly.springapp.model.Sale;
import com.examly.springapp.service.SaleService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SaleController {

    @Autowired
    SaleService saleService;

    @GetMapping(value="/crm/sale")
    public List<Sale> getSale(){
        return saleService.getSale();
    }

    @GetMapping(value="/crm/sale/{id}")
    public Sale getSaleById(@PathVariable("id")Long saleId){
        return saleService.getSaleById(saleId);
    }

    @PostMapping(value="/crm/sale")
    public Sale addSale(@RequestBody Sale newSale){
        return saleService.addSale(newSale);
    }

    @PutMapping(value="/crm/sale/{id}")
    public String updateSale(@PathVariable("id")Long saleId,@RequestBody Sale UpdatedSale){
        return saleService.updateSale(saleId,UpdatedSale);
    }

    @DeleteMapping(value="/crm/sale/{id}")
    public String deleteSaleById(@PathVariable("id") Long saleId){
        return saleService.deleteSaleById(saleId);
    }

    @GetMapping(value="/crm/sale/purchaseHistory/{id}")
    public List<Sale> purchaseHistory(@PathVariable("id")Long customerId){
        return saleService.purchaseHistory(customerId);
    }
} 
