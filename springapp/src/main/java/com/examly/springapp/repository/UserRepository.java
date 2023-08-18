package com.examly.springapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import com.examly.springapp.enumeration.UserRoles;
import com.examly.springapp.model.User;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User,Long>{
    boolean existsByEmail(String email);

    List<User> findByRolesIn(UserRoles[] role);

    User findOneByEmailIgnoreCaseAndPassword(String email, String password);
    
}
