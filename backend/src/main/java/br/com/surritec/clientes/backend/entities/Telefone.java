package br.com.surritec.clientes.backend.entities;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_telefone_cliente")
public class Telefone {

    @EmbeddedId
    private TelefoneTipo id;
    @Column(name = "tipo_telefone")
    private String tipoTelefone;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_cliente", nullable = false, insertable = false, updatable = false)
    private Cliente cliente;

    public Telefone() {

    }

    public Telefone(long idCliente, String telefone, String tipoTelefone) {
        TelefoneTipo tipo = new TelefoneTipo();
        tipo.setTelefone(telefone);
        tipo.setIdCliente(idCliente);
        this.tipoTelefone = tipoTelefone;
    }

    public String getTelefone() {
        return id.getTelefone();
    }

    public void setTelefone(String telefone) {
        this.id.setTelefone(telefone);
    }

    public long getIdCliente() {
        return id.getIdCliente();
    }

    public void setIdCliente(long idCliente) {
        this.id.setIdCliente(idCliente);
    }

    public String getTipoTelefone() {
        return tipoTelefone;
    }

    public void setTipoTelefone(String tipoTelefone) {
        this.tipoTelefone = tipoTelefone;
    }
}
