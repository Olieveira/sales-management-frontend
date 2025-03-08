import { Produto } from "../services/produtoService";

interface ProdutosListProps {
    produtos: Produto[];
}

const ProdutosList: React.FC<ProdutosListProps> = ({ produtos }) => {
    return (
        <ul className="space-y-2">
            {produtos.map((produto) => (
                <li key={produto.idProduto} className="p-2 border rounded-lg shadow-sm">
                    <span className="font-bold">{produto.nome}</span> - R$ {produto.preco}
                </li>
            ))}
        </ul>
    );
};

export default ProdutosList;