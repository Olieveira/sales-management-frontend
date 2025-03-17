import { Produto } from "../services/produtoService";
import { ProdutoCard, ProdutoListItem, SelectProdutoListItem } from "./Produto";

interface ProdutosListProps {
    produtos: Array<{ produto: Produto, quantidade?: number }>;
    card?: boolean;
    // Para renderização em vendas
    list?: boolean;
    selectItem?: boolean;
    onDeleteFromList?: (id: number) => void;
}

const ProdutosList: React.FC<ProdutosListProps> = ({ produtos, card, list, selectItem, onDeleteFromList }) => {

    const renderProduto = (produto: Produto, quantidade?: number) => {
        if (produto) {
            if (card) {
                return <ProdutoCard key={produto.idProduto} produto={produto} quantidade={quantidade} />;
            } else if (list) {
                return <ProdutoListItem key={produto.idProduto} produto={produto} quantidade={quantidade} onDelete={onDeleteFromList} />;
            } else if (selectItem) {
                return <SelectProdutoListItem key={produto.idProduto} produto={produto} />
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
            }) : (<div>Nenhum produto registrado!</div>)}
        </div>
    );
};

export default ProdutosList;