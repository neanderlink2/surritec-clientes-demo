package br.com.surritec.clientes.backend.models;

public class TelefoneDTO {
    private String telefone;
    private String tipoTelefone;

    public TelefoneDTO() {
        
    }

    public TelefoneDTO(String telefone, String tipoTelefone) {
        this.telefone = telefone;
        this.tipoTelefone = tipoTelefone;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getTipoTelefone() {
        return tipoTelefone;
    }

    public void setTipoTelefone(String tipoTelefone) {
        this.tipoTelefone = tipoTelefone;
    }    
}
