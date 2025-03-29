import React from 'react';
import { Estoque } from '../services/estoqueService';


interface EstoqueListProps {
    estoque: Estoque[];
}

export const EstoqueList: React.FC<EstoqueListProps> = ({ estoque }) => {
    return (
        <div className="w-full max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md p-4">
            <table className="table-auto w-full text-left text-amber-100">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Produto</th>
                        <th className="px-4 py-2">Quantidade</th>
                        <th className="px-4 py-2">Estoque Min.</th>
                        <th className="px-4 py-2">Un. de Medida</th>
                        <th className="px-4 py-2">Criado em</th>
                    </tr>
                </thead>
                <tbody>
                    {estoque.map((item) => (
                        <tr key={item.id_material} className="hover:bg-gray-700">
                            <td className="border px-4 py-2">{item.nome}</td>
                            <td className="border px-4 py-2">{item.quantidade}</td>
                            <td className="border px-4 py-2">{item.estoqueMin}</td>
                            <td className="border px-4 py-2">{item.unidade}</td>
                            <td className="border px-4 py-2">{item.criadoEm.replace(/-/g, "/").split('T')[0]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
