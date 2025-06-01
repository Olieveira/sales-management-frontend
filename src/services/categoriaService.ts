import api from "../api/api"

interface Categoria {
    idCategoria: number,
    nome: string
}

export const getCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get('/categorias')
    return response.data
}