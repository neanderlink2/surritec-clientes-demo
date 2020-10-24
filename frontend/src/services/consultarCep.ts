import axios from 'axios';

export type CEP = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: number;
    gia: number;
    ddd: string;
}

export async function buscarCep(cep: string) {
    try {
        const response = await axios.get<CEP>(`https://viacep.com.br/ws/${cep}/json`);
        return response.data;
    } catch (error) {
        console.error("ERRO AO BUSCAR O CEP. Detalhes:", error);
        return undefined;
    }
}