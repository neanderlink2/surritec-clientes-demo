package br.com.surritec.clientes.backend.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.surritec.clientes.backend.entities.User;

@RestController
@RequestMapping("/api/userinfo")
public class UserInfoController {
    @GetMapping("/me")
    public ResponseEntity<Map<Object, Object>> currentUser(@AuthenticationPrincipal User userDetails) {
        Map<Object, Object> model = new HashMap<>();
        model.put("username", userDetails.getUsername());
        model.put("roles",
                userDetails.getAuthorities().stream().map(a -> a.getAuthority()).collect(Collectors.toList()));
        model.put("first_name", userDetails.getPrimeiroNome());
        model.put("last_name", userDetails.getUltimoNome());
        return ResponseEntity.ok(model);
    }
}