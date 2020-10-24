package br.com.surritec.clientes.backend.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String nome;
    private String cpf;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_cliente", referencedColumnName = "id")
    private Endereco endereco;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Telefone> telefones;
    @ElementCollection
    private List<String> emails;

    public Cliente() {

    }

    public Cliente(String nome, String cpf, List<String> emails, Endereco endereco, List<Telefone> telefones) {
        this.nome = nome;
        this.cpf = cpf.replaceAll("[.]", "").replaceAll("[-]", "").replaceAll("[\s]", "");
        this.emails = emails;
        this.endereco = endereco;
        telefones.forEach((x) -> x.setTelefone(x.getTelefone().replaceAll("[(]", "").replaceAll("[)]", "")
                .replaceAll("[\s]", "").replaceAll("[-]", "").replaceAll("[.]", "")));
        this.telefones = telefones;
    }

    public long getId() {
        return id;
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
        this.cpf = cpf.replaceAll("[.]", "").replaceAll("[-]", "").replaceAll("[\s]", "");
    }

    public List<String> getEmails() {
        return emails;
    }

    public void setEmails(List<String> emails) {
        this.emails = emails;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public List<Telefone> getTelefones() {
        return telefones;
    }

    public void setTelefones(List<Telefone> telefones) {
        telefones.forEach((x) -> x.setTelefone(x.getTelefone().replaceAll("[(]", "").replaceAll("[)]", "")
                .replaceAll("[\s]", "").replaceAll("[-]", "").replaceAll("[.]", "")));
        this.telefones = telefones;
    }

    public void editar(String nome, String cpf, List<String> emails, Endereco endereco, List<Telefone> telefones) {
        this.nome = nome;
        this.cpf = cpf.replaceAll("[.]", "").replaceAll("[-]", "").replaceAll("[\s]", "");
        this.emails = emails;
        this.endereco = endereco;
        telefones.forEach((x) -> x.setTelefone(x.getTelefone().replaceAll("[(]", "").replaceAll("[)]", "")
                .replaceAll("[\s]", "").replaceAll("[-]", "").replaceAll("[.]", "")));
        this.telefones = telefones;
    }
}
