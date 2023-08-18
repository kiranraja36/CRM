package com.examly.springapp.repository;

import com.examly.springapp.model.Sale;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;



public interface SaleRepository extends JpaRepository<Sale,Long> {
    List<Sale> findByCustomerId(Long customerId);

    @Query("SELECT SUM(s.amount) FROM Sale s")
    Double calculateTotalSalesAmount();

    @Query("SELECT MONTH(s.date) AS month, YEAR(s.date) AS year, SUM(s.amount) AS totalAmount " +
            "FROM Sale s GROUP BY MONTH(s.date), YEAR(s.date) ORDER BY MONTH(s.date) ASC")
    List<Object[]> getTotalSalesAmountPerMonth();

    @Query("SELECT COUNT(s.id) from Sale s where month(s.date)=month(curdate())")
    int noOfSalesThisMonth();
}
