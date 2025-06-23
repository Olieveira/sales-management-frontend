import api from "../api/api";

export interface Processo {
    idProcesso: number,
    nome: string,
    descricao: string,
    idCategoria: number,
    criadoEm: Date
}

export const getAll = async (): Promise<Processo[]> => {
    const response = await api.get('/processos')
    return response.data;
}