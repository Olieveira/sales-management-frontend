import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelectAlert, useAlert } from "../components/AlertContext";

export const Home = () => {
    const startSelectAlert = useSelectAlert();
    const startAlert = useAlert();

    const confirmTest = async (type: 'number' | 'boolean') => {
        if (type == "number") {
            const quantidade = await startSelectAlert("Selecione a quantidade desejada:", 'number')
            startAlert("Valor numérico retornado:" + quantidade)
        }

        if (type == "boolean") {
            const confirm = await startSelectAlert("Tem certeza que deseja continunar?", "boolean")
            startAlert("Valor boolean retornado:" + confirm)
        }
    }

    return (
        <AnimatePresence>
            <div className='h-full flex justify-center items-center overflow-hidden'>
                <motion.div className='grid grid-cols-2 gap-4 w-75 items-center justify-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <Link to="/produtos" className="shadow-2xl shadow-gray-800 duration-100 cursor-pointer hover:rounded-4xl hover:w-36 hover:h-36 w-32 h-32 rounded-2xl border-4 border-fuchsia-700 bg-gray-900 flex justify-center items-center">
                        <h2 className='font-bold text-amber-100 text-lg'>Produtos</h2>
                    </Link>
                    <Link to="/vendas" className="shadow-2xl shadow-gray-800 transition-all duration-100 cursor-pointer hover:rounded-4xl hover:w-36 hover:h-36 w-32 h-32 rounded-2xl border-4 border-blue-700 bg-gray-900 flex justify-center items-center">
                        <h2 className='font-bold text-amber-100 text-lg'>Vendas</h2>
                    </Link>
                    <Link to="/estoque" className="shadow-2xl shadow-gray-800 transition-all duration-100 cursor-pointer hover:rounded-4xl hover:w-36 hover:h-36 w-32 h-32 rounded-2xl border-4 border-green-700 bg-gray-900 flex justify-center items-center">
                        <h2 className='font-bold text-amber-100 text-lg'>Estoque</h2>
                    </Link>
                    <Link to="/" className="shadow-2xl shadow-gray-800 transition-all duration-100 cursor-pointer hover:rounded-4xl hover:w-36 hover:h-36 w-32 h-32 rounded-2xl border-4 border-amber-700 bg-gray-900 flex justify-center items-center">
                        <h2 className='font-bold text-amber-100 text-lg'>Fabricação</h2>
                    </Link>

                    <div className="cursor-pointer hover:rounded-4xl hover:w-36 hover:h-36 w-32 h-32 rounded-2xl bg-red-900 flex justify-center items-center"
                        onClick={() => confirmTest("number")}
                    >
                        <h2 className='font-bold text-amber-100 text-lg'>Teste Num</h2>
                    </div>

                    <div className="cursor-pointer hover:rounded-4xl hover:w-36 hover:h-36 w-32 h-32 rounded-2xl bg-red-900 flex justify-center items-center"
                        onClick={() => confirmTest("boolean")}
                    >
                        <h2 className='font-bold text-amber-100 text-lg'>Teste Boolean</h2>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};