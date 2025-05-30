import { motion } from "framer-motion";
import { FaCog, FaThumbsDown } from "react-icons/fa";

interface ProdutoCardProps {
    texto: String;
    error?: boolean
}

export const Loading: React.FC<ProdutoCardProps> = ({ texto, error }) => {

    return (
        <motion.div className="flex flex-wrap w-full h-full p-3 justify-center items-center"
            initial={{ y: -100, opacity: 0, transition: { delay: 0.2 } }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut', type: 'spring' }}
        >
            {error ? (
                <motion.div className="flex flex-row justify-center items-center flex-wrap">
                    <FaThumbsDown size={52} className="text-red-200 p-1.5 animate-[bounce_2s_ease-in-out_infinite]" />
                    <h2 className="px-3 text-3xl text-red-200 text-center font-thin">Erro ao carregar {texto}!</h2>
                </motion.div>
            ) :
                <motion.div className="flex flex-row justify-center items-center flex-wrap">
                    <FaCog size={52} className="text-amber-100 animate-[spin_1.5s_linear_infinite] ease-in-out p-1.5" />
                    <h2 className="px-3 text-3xl text-amber-100 font-thin animate-[pulse_2s_ease-in-out_infinite]">Carregando {texto}...</h2>
                </motion.div>
            }
        </motion.div>
    );
};