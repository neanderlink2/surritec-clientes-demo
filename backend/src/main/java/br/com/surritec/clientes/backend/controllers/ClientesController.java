package br.com.surritec.clientes.backend.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.surritec.clientes.backend.entities.Cliente;
import br.com.surritec.clientes.backend.entities.Telefone;
import br.com.surritec.clientes.backend.models.ClienteDTO;
import br.com.surritec.clientes.backend.models.TelefoneDTO;
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

    @GetMapping("/{idCliente}")
    public ResponseEntity getClientePorId(HttpServletRequest request,
            @PathVariable(name = "idCliente") long idCliente) {
        Optional<Cliente> cliente = clienteRepository.findById(idCliente);
        if (!cliente.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cliente.get());
    }

    @PostMapping
    public ResponseEntity postCliente(HttpServletRequest request, @Valid @RequestBody() ClienteDTO cliente) {
        List<Telefone> telefones = transformTelefoneDtoToEntity(cliente.getTelefones());

        Cliente entity = new Cliente(cliente.getNome(), cliente.getCpf(), cliente.getEmails(), cliente.getEndereco(),
                telefones);
        Cliente saved = clienteRepository.save(entity);
        String baseUrl = String.format("%s://%s:%d/api/clientes/%d", request.getScheme(), request.getServerName(),
                request.getServerPort(), saved.getId());

        return ResponseEntity.created(URI.create(baseUrl)).body(saved);
    }

    @PutMapping("/{idCliente}")
    public ResponseEntity putCliente(@PathVariable(name = "idCliente") long idCliente,
            @Valid @RequestBody() ClienteDTO cliente) {
        Optional<Cliente> query = clienteRepository.findById(idCliente);
        if (!query.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Cliente entity = query.get();
        List<Telefone> telefones = transformTelefoneDtoToEntity(cliente.getTelefones());
        entity.editar(cliente.getNome(), cliente.getCpf(), cliente.getEmails(), cliente.getEndereco(), telefones);
        return ResponseEntity.ok(clienteRepository.save(entity));
    }

    @DeleteMapping("/{idCliente}")
    public ResponseEntity deleteCliente(@PathVariable(name = "idCliente") long idCliente) {
        Optional<Cliente> entity = clienteRepository.findById(idCliente);
        if (!entity.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        clienteRepository.delete(entity.get());
        return ResponseEntity.noContent().build();
    }

    private List<Telefone> transformTelefoneDtoToEntity(List<TelefoneDTO> lista) {
        List<Telefone> telefones = new ArrayList<>();
        lista.forEach(tel -> {
            Telefone telefone = new Telefone();
            telefone.setTelefone(tel.getTelefone());
            telefone.setTipoTelefone(tel.getTipoTelefone());
            telefones.add(telefone);
        });
        return telefones;
    }
}