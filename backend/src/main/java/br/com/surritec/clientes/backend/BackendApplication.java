package br.com.surritec.clientes.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.com.surritec.clientes.backend.repositories.UserRepository;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    UserRepository users;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    public BackendApplication(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // SqlRowSet resultSet = jdbcTemplate.queryForRowSet("SELECT * FROM employees");
        // while (resultSet.next()) {
        // System.out.println(resultSet.getString("FirstName"));
        // }
    }   
}
