package br.com.surritec.clientes.backend.models;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import br.com.surritec.clientes.backend.entities.Endereco;
import br.com.surritec.clientes.backend.entities.validations.ListStringMinSizeConstraintConstraint;
import br.com.surritec.clientes.backend.entities.validations.ListTelefoneMinSizeConstraint;

public class ClienteDTO {
    private long id;

    @NotBlank(message = "O nome é obrigatório")    
    @Length(min = 3, max = 100, message = "O nome deve possuir no mínimo 3 caracteres e no máximo 100 caracteres")
    @Pattern(regexp = "^((?![^A-Za-z0-9\s]+).)*$", message = "O nome deve possuir apenas letras e números")
    private String nome;

    @NotBlank(message = "O CPF é obrigatório")
    @Length(min = 3, max = 100, message = "O CPF deve possuir no mínimo 11 caracteres e no máximo 15 caracteres.")    
    private String cpf;
    private Endereco endereco;

    @ListTelefoneMinSizeConstraint(value = 1, message = "Deve possuir no mínimo 1 telefone.")
    private List<TelefoneDTO> telefones;

    @ListStringMinSizeConstraintConstraint(value = 1, message = "Deve possuir no mínimo 1 e-mail.")
    private List<String> emails;

    public ClienteDTO(String nome, String cpf, List<String> emails, Endereco endereco, List<TelefoneDTO> telefones) {
        this.nome = nome;
        this.cpf = cpf;
        this.emails = emails;
        this.endereco = endereco;
        this.telefones = telefones;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public List<TelefoneDTO> getTelefones() {
        return telefones;
    }

    public void setTelefones(List<TelefoneDTO> telefones) {
        this.telefones = telefones;
    }

    public List<String> getEmails() {
        return emails;
    }

    public void setEmails(List<String> emails) {
        this.emails = emails;
    }
}
