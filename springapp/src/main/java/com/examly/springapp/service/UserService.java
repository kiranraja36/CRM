package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.DTO.LoginDTO;
import com.examly.springapp.enumeration.UserRoles;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;

@Service
public class UserService{

    @Autowired
    UserRepository userRepository;

    public List<User> getAllUser() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long userId){
        return userRepository.findById(userId).orElse(null);
    }   
    
    public List<User> getUserByRoles(UserRoles[] role){
        return userRepository.findByRolesIn(role);
    }

    public String signUpRequest(User user){
        if(!user.getPassword().equals(user.getConformPassword())){
            return "Your password and conformPassword doesnt Looks same";
        }
        if(userRepository.existsByEmail(user.getEmail())){
            return "Email Already Registered";
        }

        userRepository.save(user);
        return "User created Successfully";
    }
      
    public String loginRequest(LoginDTO loginRequest){
        User user=userRepository.findOneByEmailIgnoreCaseAndPassword(loginRequest.getEmail(),loginRequest.getPassword());
        if(user==null){
            return "Invalid EmailId or Password";
        }

        return "Login Successfull";
    }

        public String updateUserById(Long userId,User updatedUser) {
        User user=userRepository.findById(userId).orElse(null);
        if(user==null){
            return "User not Found";
        }
        Optional.ofNullable(updatedUser.getName())
            .ifPresent(user::setName);

        Optional.ofNullable(updatedUser.getEmail())
            .ifPresent(user::setEmail);

        Optional.ofNullable(updatedUser.getRoles())
            .ifPresent(user::setRoles);

        Optional.ofNullable(updatedUser.getPassword())
            .ifPresent(user::setPassword);

        Optional.ofNullable(updatedUser.getConformPassword())
            .ifPresent(user::setConformPassword);    
        
        if(!user.getPassword().equals(user.getConformPassword())){
            return "Your password and conformPassword doesnt Looks same";
        }

        userRepository.save(user);
        return "User Updated Successfully";   
    }

    public String deleteUserById(Long userId){
        userRepository.deleteById(userId);
        return "Account Deleted Successfully";
    }
}