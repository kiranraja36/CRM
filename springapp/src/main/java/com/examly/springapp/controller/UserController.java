package com.examly.springapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.DTO.LoginDTO;
import com.examly.springapp.enumeration.UserRoles;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(value="/crm/user")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    
    @GetMapping(value="/crm/user/roles")
    public List<User> getUser(@RequestParam("role") UserRoles[] role){
        return userService.getUserByRoles(role);
    }


    @GetMapping(value="/crm/user/{id}")
    public User getUser(@PathVariable("id")Long userId){
        return userService.getUserById(userId);
    }
    
    @PostMapping(value="/signUp")
    public String signUpRequest(@RequestBody User user){
        return userService.signUpRequest(user);
    } 

    @PostMapping(value="/login")
    public String loginRequest(@RequestBody LoginDTO loginRequest){
        return userService.loginRequest(loginRequest);
    }

    
    @PutMapping(value="/crm/user/{id}")
    public String updateUserById(@PathVariable("id") Long userId,@RequestBody User updatedUser){
        return userService.updateUserById(userId,updatedUser);
    }

    @DeleteMapping(value="/crm/user/{id}")
    public String deleteUserById(@PathVariable("id") Long userId){
        return userService.deleteUserById(userId);
    }
}
