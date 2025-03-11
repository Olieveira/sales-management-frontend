import { Produto } from "../services/produtoService";
import { ProdutoCard } from "./Produto";

interface ProdutosListProps {
    produtos: Produto[];
}

const ProdutosList: React.FC<ProdutosListProps> = ({ produtos }) => {
    return (
        <div className="flex flex-wrap gap-4 justify-center items-center">
            {produtos.map((produto) => {
                if (produto.ativo || !produto.ativo) return <ProdutoCard key={produto.idProduto} produto={produto} />
            }
            )}
        </div>
    );
};

export default ProdutosList;