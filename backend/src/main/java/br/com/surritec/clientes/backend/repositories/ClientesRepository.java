package br.com.surritec.clientes.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.surritec.clientes.backend.entities.Cliente;

public interface ClientesRepository extends JpaRepository<Cliente, Long> {
    
}
