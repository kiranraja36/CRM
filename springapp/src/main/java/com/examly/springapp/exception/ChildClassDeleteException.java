package com.examly.springapp.exception;

public class ChildClassDeleteException extends RuntimeException{
    public ChildClassDeleteException(String message){
        super(message);
    }
}
