import { Link } from "react-router-dom";
import { Produto, inativarProduto, ativarProduto } from "../services/produtoService";
import { FaCube, FaCommentDots, FaRulerCombined, FaShoppingBag, FaCalendar, FaCoins, FaCubes, FaBoxes, FaTrash } from "react-icons/fa";

interface ProdutoCardProps {
    produto: Produto;
    quantidade?: number; // Para renderização em vendas 
}

const handleTrocarStatus = async (idProduto: number, produto: Produto) => {
    const confirmacao = window.confirm(`Tem certeza que deseja ${produto.ativo ? 'inativar' : 'ativar'} o produto ${produto.nome} ?`);

    if (confirmacao) {
        const resultado = produto.ativo ? await inativarProduto(idProduto) : await ativarProduto(idProduto);

        if (resultado && resultado.success) {
            alert(`Produto ${produto.nome} ${!produto.ativo ? 'ativado' : 'inativado'} com sucesso!`);
            window.location.reload();
        } else {
            console.error(`Erro ao ${produto.ativo ? 'inativar' : 'ativar'} o produto: `, produto.nome);
            alert(`Erro ao inativar o produto ${produto.nome}!\n${resultado.error || 'Erro desconhecido'}`);
        }
    }
};

export const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
    return (
        <div className={`rounded-2xl w-72 min-h-72 ${!produto.ativo ? 'bg-rose-950' : 'bg-gray-800'} flex flex-col justify-between items-center shadow-lg shadow-gray-700`}>

            <div className="w-full rounded-t-2xl flex h-12 justify-around items-center p-2 bg-amber-100">
                <div className="h-full flex items-center justify-center">
                    <FaCube size={24} className="text-gray-600" />
                </div>
                <h2 className="text-lg text-center font-semibold text-gray-600 px-2 shrink leading-tight">{produto.nome}</h2>
                <h3 className="text-lg text-center font-semibold text-gray-600">{produto.idProduto}</h3>
            </div>

            <div className="flex flex-row justify-center items-center gap-4 mt-4 p-1">
                <div className="h-full flex items-center justify-center p-2">
                    <FaCommentDots size={24} className="text-amber-100" />
                </div>
                <div className="flex justify-center text-center rounded-2xl p-2 bg-amber-100">
                    <p className="text-gray-600">{produto.descricao}</p>
                </div>
            </div>

            <div className="flex flex-row w-full my-4">
                <div className="w-1/2 flex flex-col justify-center items-center text-center">
                    <FaRulerCombined size={24} className="text-amber-100" />
                    <p className="text-md px-2 text-white font-thin">Un. de medida</p>
                    <div className="h-8 flex justify-center items-center mt-2 p-2 rounded-2xl bg-amber-100 text-md font-extralight">
                        <p>{produto.unidade}</p>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center text-center">
                    <FaShoppingBag size={24} className="text-amber-100" />
                    <p className="text-md px-2 text-white font-thin">Estoque</p>
                    <div className="h-8 flex justify-center items-center mt-2 p-2 rounded-2xl bg-amber-100 text-md font-extralight">
                        <p>{produto.estoqueUn}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full my-4">
                <div className="w-1/2 flex flex-col justify-center items-center text-center">
                    <FaCalendar size={24} className="text-amber-100" />
                    <p className="text-md px-1 text-white font-thin">Data de criação</p>
                    <div className="min-h-8 flex-col justify-center items-center mt-2 p-2 rounded-2xl bg-amber-100 text-md font-extralight">
                        <p>{new Date(produto.criadoEm).toLocaleDateString('pt-BR')}</p>
                        <p>{new Date(produto.criadoEm).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center text-center">
                    <FaCoins size={24} className="text-amber-100" />
                    <p className="text-md px-2 text-white font-thin">Preço</p>
                    <div className="h-8 flex justify-center items-center mt-2 p-2 rounded-2xl bg-amber-100 text-md font-extralight">
                        <p>R$ {Number(produto.preco).toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="w-full rounded-b-2xl flex h-12 justify-around items-center bg-amber-100">
                <Link to={`/produtos/edit/${produto.idProduto}`} className="cursor-pointer w-1/2 flex justify-center items-center bg-amber-200 text-gray-800 font-bold rounded-bl-2xl m-1 p-2">
                    Editar
                </Link>
                <Link onClick={() => handleTrocarStatus(Number(produto.idProduto), produto)} to={'#'} className={`cursor-pointer w-1/2 flex justify-center items-center ${produto.ativo ? 'bg-red-700' : 'bg-green-500'} transition-all duration-150 ease-in-out ${produto.ativo ? 'hover:bg-red-900' : 'hover:bg-green-700'} text-gray-600 font-bold rounded-br-2xl m-1 p-2`}>
                    <p className="text-md font-semibold text-amber-100 hover">{produto.ativo ? 'Inativar' : 'Ativar'}</p>
                </Link>
            </div>
        </div>
    );
};

interface ProdutoListItemProps {
    produto: Produto;
    quantidade?: number;
    onDelete?: (idProduto: number) => void;
}

export const ProdutoListItem: React.FC<ProdutoListItemProps> = ({ produto, quantidade, onDelete }) => {

    return (
        <div className={`relative flex justify-around rounded-2xl w-full gap-4 min-h-10 p-2 mx-2 ${!produto.ativo ? 'bg-rose-950' : 'bg-gray-800'} flex shadow-lg shadow-gray-700`}>
            <div className="flex justify-between items-center gap-x-2">
                <FaCubes size={24} className="text-amber-100" />
                <span className="text-amber-100 ml-2 text-base">{produto.nome}</span>
            </div>
            <div className="flex justify-between items-center gap-x-2">
                <FaBoxes size={24} className="text-amber-100" />
                <span className="text-amber-100 ml-2 text-base">{quantidade}</span>
            </div>
            {onDelete && (
                <div onClick={() => onDelete(produto.idProduto)} className="cursor-pointer absolute -top-4.5 -right-2.5 rounded-full bg-gray-800 p-1.5 hover:p-2 transition-all duration-100">
                    <FaTrash size={16} className="text-red-200" />
                </div>
            )}
        </div >
    );
};

interface SelectProdutoListItem{
    produto: Produto;
}

export const SelectProdutoListItem: React.FC<ProdutoListItemProps> = ({ produto }) => {

    return (
        <div className={`cursor-pointer flex justify-around rounded-2xl gap-4 p-2 mx-2 min-w-48 ${!produto.ativo ? 'bg-rose-950' : 'bg-gray-800'} flex shadow-lg shadow-gray-700`}>
            <div className="flex justify-between items-center gap-x-2">
                <FaCubes size={24} className="text-amber-100" />
                <span className="text-amber-100 ml-2 text-base">{produto.nome}</span>
            </div>
        </div >
    );
};