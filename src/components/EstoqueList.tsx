import React from 'react';
import { Estoque } from '../services/estoqueService';
import { FaClone, FaEdit, FaEye, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface EstoqueListProps {
    estoque: Estoque[];
    handleEditClick: (material: Estoque) => void
    handleDelete: (id: number, nome: string) => void
}

export const EstoqueList: React.FC<EstoqueListProps> = ({ estoque, handleEditClick, handleDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="relative max-w-full max-h-full bg-gray-800 rounded-lg shadow-md p-2">

            <FaPlusCircle size={30}
                className="text-amber-100 hover:text-green-200 transition-all duration-150 cursor-pointer relative -top-5 -left-5 animate-pulse rounded-full"
                onClick={() => {
                    navigate('/estoque/new')
                }} />

            <table className="mt-3 table-auto w-full text-center text-amber-100">
                <thead>
                    <tr>
                        <th className="sm:px-4 px-2 py-2">Produto</th>

                        <th className="sm:px-4 px-2 py-2 sm:table-cell hidden">Quantidade</th>
                        <th className="sm:px-4 px-2 py-2 table-cell sm:hidden">Quant.</th>

                        <th className="sm:px-4 px-2 py-2 hidden sm:table-cell">Estoque Min.</th>
                        <th className="sm:px-4 px-2 py-2 hidden sm:table-cell">Un. de Medida</th>
                        <th className="sm:px-4 px-2 py-2 hidden md:table-cell">Criado em</th>
                        <th className="sm:px-4 px-2 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {estoque.map((item, i) => (
                        <motion.tr
                            key={item.idMaterial}
                            className={`hover:bg-gray-700 ${i % 2 == 0 ? 'bg-gray-800' : 'bg-gray-700'}`}
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut', type: 'spring', delay: Number('0.' + i) }}
                        >
                            <td className="border sm:px-4 px-2 py-2">{item.nome}</td>
                            <td className="border sm:px-4 px-2 py-2">{item.quantidade}</td>
                            <td className="border px-4 py-2 hidden sm:table-cell">{item.estoqueMin}</td>
                            <td className="border px-4 py-2 hidden sm:table-cell">{item.unidade}</td>
                            <td className="border px-4 py-2 hidden md:table-cell">{item.criadoEm.replace(/-/g, "/").split('T')[0]}</td>
                            <td className="px-4 py-2 flex flex-col justify-center gap-1 items-center">

                                <div className='flex flex-row justify-center items-center gap-2'>
                                    <button
                                        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full "
                                        onClick={() => handleEditClick(item)}
                                    >
                                        <FaEdit className='sm:block hidden' />
                                        <FaEye className='sm:hidden block' />
                                    </button>

                                    <button className={`cursor-pointer ${i % 2 == 0 ? 'bg-gray-700' : 'bg-gray-800'} hover:bg-gray-800 text-amber-100 font-bold py-2 px-2 rounded-full`}
                                        onClick={() => navigate(`/estoque/new/${Number(item.idMaterial)}`)}>
                                        <FaClone />
                                    </button>
                                </div>

                                <button
                                    className="cursor-pointer bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-2 rounded-full"
                                    onClick={() => handleDelete(item.idMaterial, item.nome)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>

        </div >
    );
};
