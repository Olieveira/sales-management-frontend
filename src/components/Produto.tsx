import { Link } from "react-router-dom";
import { Produto } from "../services/produtoService";
import { FaCube, FaCommentDots, FaRulerCombined, FaShoppingBag, FaCalendar, FaCoins} from "react-icons/fa";

interface ProdutoCardProps {
    produto: Produto;
}

export const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
    return (
        <div className="rounded-2xl min-w-64 min-h-72 bg-gray-800 flex flex-col justify-between items-center shadow-lg shadow-gray-700">

            <div className="w-full rounded-t-2xl flex h-12 justify-around items-center p-2 bg-amber-100">
                <div className="h-full flex items-center justify-center">
                    <FaCube size={24} className="text-gray-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-600">{produto.nome}</h2>
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
                <Link to={`/produtos/u/${produto.idProduto}`} className="cursor-pointer w-1/2 flex justify-center items-center bg-amber-200 text-gray-600 font-bold rounded-bl-2xl m-1 p-2 hover:m-0">
                    Editar
                </Link>
                <button className="cursor-pointer w-1/2 flex justify-center items-center bg-orange-300 text-gray-600 font-bold rounded-br-2xl m-1 p-2 hover:m-0">
                    Excluir
                </button>
            </div>
        </div>
    );
};
