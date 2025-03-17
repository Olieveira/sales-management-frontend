import { useEffect } from "react";
import { Venda } from "../services/vendasService";
import { VendaCard } from "./Venda";

interface VendasListProps {
    vendas: Venda[];
    deleteProdutosBtn?: boolean;
}

export const VendasList: React.FC<VendasListProps> = ({ vendas, deleteProdutosBtn = false }) => {
    useEffect(() => {
        console.log("vendas recebidas no vendasList:\n", vendas)
    }, [])
    return (
        <div className="flex flex-wrap gap-4 justify-center items-center">
            {vendas.length > 0 && vendas.map((venda) => (
                <div key={venda.idVenda}>
                    <VendaCard venda={venda} deleteProdutosBtn={deleteProdutosBtn} />
                </div>
            ))}
        </div>
    );
};