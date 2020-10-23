package br.com.surritec.clientes.backend.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.surritec.clientes.backend.entities.Cliente;
import br.com.surritec.clientes.backend.models.ClienteDTO;
import br.com.surritec.clientes.backend.repositories.ClientesRepository;

@RestController
@RequestMapping("/api/clientes")
public class ClientesController {

    private ClientesRepository clienteRepository;

    public ClientesController(ClientesRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @GetMapping
    public List<Cliente> getClientes() {
        return clienteRepository.findAll();
    }

    @PostMapping
    public Cliente postCliente(@Valid @RequestBody() ClienteDTO cliente) {
        Cliente entity = new Cliente(cliente.getNome(), cliente.getCpf(), cliente.getEmails(), cliente.getEndereco(),
                cliente.getTelefones());

        return clienteRepository.save(entity);
    }

    @PutMapping("/{idCliente}")
    public Cliente putCliente(@PathVariable(name = "idCliente") long idCliente,
            @Valid @RequestBody() ClienteDTO cliente) {
        Optional<Cliente> query = clienteRepository.findById(idCliente);
        if (!query.isPresent()) {
            return null;
        }
        Cliente entity = query.get();
        entity.editar(cliente.getNome(), cliente.getCpf(), cliente.getEmails(), cliente.getEndereco(),
                cliente.getTelefones());
        return clienteRepository.save(entity);
    }

    @DeleteMapping("/{idCliente}")
    public boolean deleteCliente(@PathVariable(name = "idCliente") long idCliente) {
        Optional<Cliente> entity = clienteRepository.findById(idCliente);
        if (!entity.isPresent()) {
            return false;
        }

        clienteRepository.delete(entity.get());
        return true;
    }
}