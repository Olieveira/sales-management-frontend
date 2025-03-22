import api from "../api/api";

export interface Status {
    idStatus: number;
    status: string;
}

export const getStatus = async (): Promise<Status[]> => {
    const response = await api.get('/status');
    return response.data;
}