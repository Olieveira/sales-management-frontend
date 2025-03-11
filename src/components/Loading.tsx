import { FaCog, FaThumbsDown } from "react-icons/fa";

interface ProdutoCardProps {
    texto: String;
    error?: boolean
}

export const Loading: React.FC<ProdutoCardProps> = ({ texto, error }) => {

    if (!error) return (
        <div className="flex flex-wrap w-full h-full p-3 mt-8 justify-center items-center">
            <FaCog size={52} className="text-amber-100 animate-[spin_1.5s_linear_infinite] ease-in-out p-1.5" />
            <h2 className="px-3 text-3xl text-amber-100 font-thin animate-[pulse_2s_ease-in-out_infinite]">Carregando {texto}...</h2>
        </div>
    );

    if (error) return (
        <div className="flex flex-col w-full h-full p-3 mt-8 justify-center items-center">
            <FaThumbsDown size={52} className="text-red-200 p-1.5 animate-[bounce_2s_ease-in-out_infinite]" />
            <h2 className="px-3 text-3xl text-red-200 font-thin">Erro ao carregar {texto}!</h2>
        </div>
    )
};