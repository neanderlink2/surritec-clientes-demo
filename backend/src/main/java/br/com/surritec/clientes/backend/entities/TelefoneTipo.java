package br.com.surritec.clientes.backend.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class TelefoneTipo implements Serializable {
    private static final long serialVersionUID = 5999236902534007386L;

    private String telefone;
    @Column(name = "id_cliente")
    private long idCliente;

    @Override
    public String toString() {
        return "[Cliente=" + getIdCliente() + "] " + getTelefone();
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(long idCliente) {
        this.idCliente = idCliente;
    }
}
