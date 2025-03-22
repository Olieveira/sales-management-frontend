import { FaExclamationTriangle } from "react-icons/fa";
import { Produto } from "../services/produtoService";
import { ProdutoCard, ProdutoListItem, SelectProdutoListItem } from "./Produto";

interface ProdutosListProps {
    produtos: Array<{ produto: Produto, quantidade?: number }>;
    card?: boolean;
    // Para renderização em vendas
    list?: boolean;
    selectItem?: boolean;
    onDeleteFromList?: (id: number) => void;
    onSelectItem?: (produto: Produto) => void;
}

const ProdutosList: React.FC<ProdutosListProps> = ({ produtos, card, list, selectItem, onDeleteFromList, onSelectItem }) => {

    const renderProduto = (produto: Produto, quantidade?: number) => {
        if (produto) {
            if (card) {
                return <ProdutoCard key={produto.idProduto} produto={produto} quantidade={quantidade} />;
            } else if (list) {
                return <ProdutoListItem key={produto.idProduto} produto={produto} quantidade={quantidade} onDelete={onDeleteFromList} />;
            } else if (selectItem) {
                console.log("Key (id) do produto renderizado: ", produto.idProduto)
                return <SelectProdutoListItem key={produto.idProduto} produto={produto} onSelectItem={onSelectItem} />
            }
        } else {
            return <div>Produto undefined</div>
        }
        return null;
    };

    const formatRender = (produto: { produto: Produto, quantidade?: number } | Produto) => {
        if ('produto' in produto) {
            return produto.produto;
        }
        return produto;
    }

    return (
        <div className={`flex flex-wrap gap-4 justify-center items-center w-full`}>
            {produtos.length > 0 ? produtos.map((produto) => {
                return renderProduto(formatRender(produto), produto.quantidade);
            }) : (<div className="w-full rounded-lg flex flex-col justify-center items-center bg-gray-800 p-2">
                <FaExclamationTriangle size={24} className="text-red-200 animate-pulse" />
                <p className="text-lg text-amber-100 p-2">Nenhum produto registrado!</p>
            </div>)}
        </div>
    );
};

export default ProdutosList;