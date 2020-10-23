package br.com.surritec.clientes.backend.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import io.jsonwebtoken.JwtException;

@RestControllerAdvice
public class ExceptionHandlingControllerAdvice {

    @ExceptionHandler(value = { IllegalArgumentException.class, IllegalStateException.class })
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(request);
    }

    @ExceptionHandler(value = { ConstraintViolationException.class, MethodArgumentNotValidException.class })
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    protected ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        // ex.
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        //errors.put("error", ex.getMessage());
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(JwtException.class)
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    protected ResponseEntity<Object> handleUnauthorized(JwtException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", "INVALID_TOKEN");
        errors.put("description", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(request);
    }
}