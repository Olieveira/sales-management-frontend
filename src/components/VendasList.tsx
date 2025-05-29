import { motion } from "framer-motion";
import { Venda } from "../services/vendasService";
import { VendaCard } from "./Venda";

interface VendasListProps {
    vendas: Venda[];
    deleteProdutosBtn?: boolean;
}

export const VendasList: React.FC<VendasListProps> = ({ vendas, deleteProdutosBtn = false }) => {
    return (
        <div className="flex flex-wrap gap-4 justify-center items-center w-full">
            {vendas.length > 0 && vendas.map((venda, i) => (

                <motion.div
                    initial={{y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut', type: 'spring', delay: Number('0.' + i) }}
                >
                    <VendaCard key={venda.idVenda} venda={venda} deleteProdutosBtn={deleteProdutosBtn} />
                </motion.div>
            ))}
        </div>
    );
};