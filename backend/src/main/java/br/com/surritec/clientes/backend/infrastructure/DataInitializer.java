package br.com.surritec.clientes.backend.infrastructure;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import br.com.surritec.clientes.backend.entities.User;
import br.com.surritec.clientes.backend.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class DataInitializer implements CommandLineRunner {    
    @Autowired
    UserRepository users;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        User userComum = new User("comum", this.passwordEncoder.encode("123456"), "Comum", "da Silva",
            Arrays.asList("ROLE_USER"));
        this.users.save(userComum);
        User userAdmin = new User("admin", this.passwordEncoder.encode("123456"), "Admin", "da Silva",
            Arrays.asList("ROLE_USER", "ROLE_ADMIN"));
        this.users.save(userAdmin);
    }
}