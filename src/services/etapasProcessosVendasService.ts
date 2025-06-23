import api from "../api/api";

interface EtapasProcessosVendas {
    idVenda: number,
    idProcesso: number,
    idEtapa: number,
    idStatusEtapa: number,
    iniciadoEm: Date,
    concluidoEm: Date
}

export const getEtapasVendas = async (): Promise<EtapasProcessosVendas[]> => {
    const response = await api.get('/etapasProcessoVenda');
    return response.data;
}