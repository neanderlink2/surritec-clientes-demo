package br.com.surritec.clientes.backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.surritec.clientes.backend.infrastructure.JwtTokenProvider;
import br.com.surritec.clientes.backend.models.AuthenticationRequest;
import br.com.surritec.clientes.backend.repositories.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    UserRepository users;

    @PostMapping("/signin")
    public ResponseEntity<Map<Object, Object>> signin(@RequestBody AuthenticationRequest data) {
        try {
            String username = data.getNomeUsuario();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getSenha()));
            String token = jwtTokenProvider.createToken(username, this.users.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found")).getRoles());
            Map<Object, Object> model = new HashMap<>();
            model.put("username", username);
            model.put("token", token);
            return ResponseEntity.ok(model);
        } catch (AuthenticationException e) {
            Map<Object, Object> model = new HashMap<>();
            model.put("message", "Usuário ou senha não foram encontrados.");
            return ResponseEntity.badRequest()
                .body(model);
        }
    }
}