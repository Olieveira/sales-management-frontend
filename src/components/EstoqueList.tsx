import React, { useState, useEffect } from 'react';
import { Estoque, getEstoqueById } from '../services/estoqueService';
import { useFornecedor } from '../hooks/useFornecedor';
import { FaClone, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Fornecedor } from '../services/fornecedorService';
import { useNavigate } from 'react-router-dom';

interface EstoqueListProps {
    estoque: Estoque[];
    id?: number;
}

export const EstoqueList: React.FC<EstoqueListProps> = ({ estoque, id }) => {
    const [selectedItem, setSelectedItem] = useState<Estoque | null>(null);
    const { data: fornecedores } = useFornecedor();

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Selected Item alterado:\n", selectedItem);
    }, [selectedItem])

    useEffect(() => {
        console.log("id recebido:\n", id);
        if (id !== undefined) {
            console.log("1");
            // novo material
            if (id === 0) {
                console.log("2");
                const fornecedor = { nome: "", contato: "", link: "" } as Fornecedor
                setSelectedItem({
                    nome: "",
                    quantidade: 0,
                    unidade: "",
                    estoqueMin: 0,
                    criadoEm: new Date(Date.now()).toISOString().split('T')[0],
                    fornecedor: {
                        nome: fornecedor.nome,
                        contato: fornecedor.contato,
                        link: fornecedor.link
                    },

                } as Estoque);
                // duplicar material
            } else if (id > 0) {
                getEstoqueById(id).then((estoque) => setSelectedItem(estoque)).catch((error) => {
                    console.error("Erro ao encontrar material para duplicar!\n", error);
                });
            } else {
                navigate('/estoque');
            }
        }
    }, []);

    const handleEditClick = (item: Estoque) => {
        setSelectedItem(item);
    };

    const handleFornecedorChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log("Campo e valor obtido no handleFornecedorChange:\n", name, value);

        if (name === 'name') {
            const fornecedor = fornecedores?.find((fornecedor) => fornecedor.nome === value);
            console.log('Fornecedor encontrado no handle:\n', fornecedor)
            console.log("Id do fornecedor:\n", fornecedor?.idFornecedor)
            if (!fornecedor) return;

            console.log('Fornecedor antes de setSelectedItem:\n', fornecedor);
            setSelectedItem((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    idFornecedor: fornecedor.idFornecedor || 0,
                    fornecedor: {
                        nome: fornecedor.nome,
                        contato: fornecedor.contato || "",
                        link: fornecedor.link || ""
                    },
                };
            });

        } else {
            setSelectedItem((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    fornecedor: {
                        ...prev.fornecedor,
                        [name]: value,
                    },
                };
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedItem((prev) => ({
            ...(prev as Estoque),
            [name]: [value],
        }));
    }

    return (
        <div className="w-full max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md p-4 max-h-screen overflow-y-auto">
            <table className="table-auto w-full text-center text-amber-100">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Produto</th>
                        <th className="px-4 py-2">Quantidade</th>
                        <th className="px-4 py-2 hidden sm:table-cell">Estoque Min.</th>
                        <th className="px-4 py-2 hidden sm:table-cell">Un. de Medida</th>
                        <th className="px-4 py-2 hidden md:table-cell">Criado em</th>
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {estoque.map((item, i) => (
                        <tr key={item.idMaterial} className={`hover:bg-gray-700 ${i % 2 == 0 ? 'bg-gray-800' : 'bg-gray-700'}`}>
                            <td className="border px-4 py-2">{item.nome}</td>
                            <td className="border px-4 py-2">{item.quantidade}</td>
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
                                        onClick={() => navigate(`/estoque/new/${Number(item.idMaterial)}`)}
                                    >
                                        <FaClone />
                                    </button>
                                </div>

                                <button
                                    className="cursor-pointer bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-2 rounded-full"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* form CRUD */}
            {
                selectedItem && (
                    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50 px-5">
                        <div className="bg-gray-700 rounded-lg shadow-md p-5 w-full max-w-lg h-fit mx-3 max-h-11/12 overflow-y-auto">
                            <h3 className="text-amber-100 text-lg font-bold mb-4">Editar Item</h3>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-amber-100 text-sm font-bold mb-2">Produto</label>
                                    <input
                                        type="text"
                                        value={selectedItem.nome}
                                        className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-amber-100 text-sm font-bold mb-2">Quantidade</label>
                                    <input
                                        type="number"
                                        value={selectedItem.quantidade}
                                        className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        onChange={(e) =>
                                            setSelectedItem({ ...selectedItem, quantidade: parseInt(e.target.value) })
                                        }
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-amber-100 text-sm font-bold mb-2">Unidade</label>
                                    <input
                                        type="text"
                                        value={selectedItem.unidade}
                                        className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        onChange={(e) =>
                                            setSelectedItem({ ...selectedItem, unidade: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-amber-100 text-sm font-bold mb-2">Estoque Min.</label>
                                    <input
                                        type="number"
                                        value={selectedItem.estoqueMin}
                                        className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        onChange={(e) =>
                                            setSelectedItem({ ...selectedItem, estoqueMin: parseInt(e.target.value) })
                                        }
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-amber-100 text-sm font-bold mb-2">Criado em</label>
                                    <input
                                        type="date"
                                        id="criadoEm"
                                        name="CriadoEm"
                                        value={new Date(selectedItem.criadoEm).toISOString().split('T')[0]}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                    />
                                </div>
                                <div className="mb-4 border-t border-gray-600 pt-4">
                                    <div className="mb-4">
                                        <label className="block text-amber-100 text-sm font-bold mb-2">Fornecedor</label>
                                        <select
                                            name="name"
                                            className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                            value={selectedItem.fornecedor.nome}
                                            onChange={handleFornecedorChange}
                                        >
                                            <option value="0">Selecione um fornecedor</option>
                                            {fornecedores?.map((fornecedor) => (
                                                <option key={fornecedor.idFornecedor} value={fornecedor.nome}>
                                                    {fornecedor.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-amber-100 text-sm font-bold mb-2">Contato</label>
                                        <input
                                            name="contato"
                                            type="text"
                                            value={selectedItem.fornecedor.contato}
                                            className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                            onChange={handleFornecedorChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-amber-100 text-sm font-bold mb-2">Link</label>
                                        <input
                                            name="link"
                                            type="text"
                                            value={selectedItem.fornecedor.link}
                                            className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                            onChange={handleFornecedorChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mr-2"
                                        onClick={() => {
                                            setSelectedItem(null);
                                            navigate('/estoque');
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};
