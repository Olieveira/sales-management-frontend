import { motion } from "framer-motion";
import React from "react";
import { FaBoxOpen } from "react-icons/fa";
import { TbCubePlus } from "react-icons/tb";
import { Link } from "react-router-dom";

interface NenhumRegistroFullProps {
    pagina: 'produtos' | 'vendas' | 'estoque'
}

export function NenhumRegistroFull({ pagina }: NenhumRegistroFullProps) {
    const [paginaH2, paginaP] = (() => {
        switch (pagina) {
            case 'estoque':
                return ['Nenhum material encontrado!', 'materiais']
            case 'produtos':
                return ['Nenhum produto encontrado!', 'produtos']
            case 'vendas':
                return ['Nenhuma venda encontrada!', 'vendas']
        }
    })();
    return (
        <motion.div className="fixed gap-2 inset-0 flex flex-col items-center justify-center bg-gray-900 z-10 overflow-hidden select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', type: 'spring', duration: 1.3 }}
        >
            <FaBoxOpen size={80} className="text-amber-200 mb-6 animate-bounce" />

            <h2 className="text-3xl text-amber-100 font-bold mb-2 text-center">{paginaH2}</h2>
            <p className="text-lg text-gray-300">Adicione {paginaP} para visualizar aqui.</p>

            <Link to={`/${pagina}/new`}
                className="transition-all text-gray-900 hover:text-green-300 w-fit mt-5 gap-5 border-gray-600 cursor-pointer hover:bg-gray-900 border-4 sm:border-2 bg-green-300 rounded-lg px-1 py-2 flex flex-row items-center justify-center">
                <TbCubePlus className="w-8 h-8" />
                <div className="px-2 text-left text-xl">
                    Novo
                </div>
            </Link>

        </motion.div>
    )
};

export const NenhumRegistroMini: React.FC = () => (
    <motion.div className="flex flex-col items-center justify-center w-full h-full py-8 select-none"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ ease: 'easeInOut', type: 'spring', duration: 1.3 }}
    >
        <FaBoxOpen size={36} className="text-amber-200 mb-2 animate-bounce" />
        <span className="text-base text-amber-100 font-semibold">Nenhum produto encontrado!</span>
    </motion.div>
);