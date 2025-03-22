import { Venda } from "../services/vendasService";
import { VendaCard } from "./Venda";

interface VendasListProps {
    vendas: Venda[];
    deleteProdutosBtn?: boolean;
}

export const VendasList: React.FC<VendasListProps> = ({ vendas, deleteProdutosBtn = false }) => {
    return (
        <div className="flex flex-wrap gap-4 justify-center items-center w-full">
            {vendas.length > 0 && vendas.map((venda) => (
                <VendaCard key={venda.idVenda} venda={venda} deleteProdutosBtn={deleteProdutosBtn} />
            ))}
        </div>
    );
};