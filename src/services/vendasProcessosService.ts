import api from "../api/api"

interface VendasProcessos {
    idProcesso: number,
    idVenda: number,
    idStatusProcesso: number,
    iniciadoEm: Date,
    concluidoEm?: Date
}

export const getVendasProcessos = async (): Promise<VendasProcessos[]> => {
    const response = await api.get('/vendasProcessos');
    return response.data;
}
