import React, { useState, useEffect } from 'react';
import { createEstoque, Estoque, getEstoqueById, updateEstoque, deleteEstoque } from '../services/estoqueService';
import { useFornecedor } from '../hooks/useFornecedor';
import { FaClone, FaEdit, FaEye, FaPlusCircle, FaTrash, FaWindowClose } from 'react-icons/fa';
import { Fornecedor } from '../services/fornecedorService';
import { useNavigate } from 'react-router-dom';
import { useAlert } from './AlertContext';

interface EstoqueListProps {
    estoque: Estoque[];
    id?: number;
}

export const EstoqueList: React.FC<EstoqueListProps> = ({ estoque, id }) => {
    const [selectedOrigItem, setSelectedOrigItem] = useState<Estoque | null>(null);
    const [selectedItem, setSelectedItem] = useState<Estoque | null>(null);
    const [selectedItemMode, setSelectedItemMode] = useState<string>('edit');
    const { data: fornecedores } = useFornecedor();
    const [alert, setAlert] = useState<{ show: boolean, msg: string, duration: number }>({ show: false, msg: "", duration: 3000 })

    const showAlert = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        if (!alert.show) return

        const maxDuration = alert.duration > 1800000 ? 1800000 : alert.duration

        const timeout = setTimeout(() => {
            setAlert((prev) => ({ ...prev, show: false }));
        }, maxDuration);

        return () => clearTimeout(timeout);
    }, [alert.msg, alert.show])

    useEffect(() => {
        console.log("Selected Item alterado:\n", selectedItem);
    }, [selectedItem])

    useEffect(() => {
        if (id !== undefined) {
            // novo material
            if (id === 0) {
                setSelectedItemMode("create");
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
                setSelectedItemMode("create");
                getEstoqueById(id).then((estoque) => {
                    setSelectedItem(estoque);
                    setSelectedOrigItem(estoque);
                }).catch((error) => {
                    console.error("Erro ao encontrar material para duplicar!\n", error);
                });
            } else {
                navigate('/estoque');
            }
        }
    }, []);

    const handleEditClick = (item: Estoque) => {
        setSelectedItemMode('edit');
        setSelectedItem(item);
    };

    const handleFornecedorChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'name') {
            const fornecedor = fornecedores?.find((fornecedor) => fornecedor.nome === value);
            if (!fornecedor) return;

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

        console.log("HandleChange:\nname:\n", name, "\nvalue:\n", value);

        setSelectedItem((prev) => ({
            ...(prev as Estoque),
            [name]: [value],
        }));
    };

    const handleSubmitCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Estado do item selecionado no momento do submit:\n", selectedItem)

        if (!selectedItem?.nome || selectedItem.quantidade == null || selectedItem.unidade === "" ||
            selectedItem.estoqueMin == null || !selectedItem.criadoEm || !selectedItem.fornecedor.nome) {
            showAlert("Preencha todos os campos!");
            return;
        }

        try {
            await createEstoque(selectedItem);
            showAlert("Material criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar material!\n", error);
            showAlert("Erro ao criar material!");
        }

        navigate("/estoque");
        window.location.reload();
    }

    const handleDelete = async (idMaterial: number, nome: string) => {
        if (window.confirm(`Tem certeza que deseja excluir o material (${nome})?`)) {
            try {
                const result = await deleteEstoque(idMaterial);
                if (result.success) {
                    showAlert(`Material (${nome}) excluído com sucesso!`)
                    setTimeout(() => window.location.reload(), 3000)
                } else {
                    console.error('Erro ao excluir material')
                    showAlert(`Erro ao excluir o material (${nome}), certifique-se que o mesmo não possui vínculos com produtos.`)
                }
            } catch (error) {
                console.error('Erro ao excluir material')
                showAlert(`Erro ao excluir o material (${nome}), certifique-se que o mesmo não possui vínculos com produtos.`)
            }
        }
    }

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedItem === selectedOrigItem) {
            showAlert("Nenhuma alteração realizada!");
            return;
        }

        if (!selectedItem?.nome || selectedItem.quantidade == null || selectedItem.unidade === "" ||
            selectedItem.estoqueMin == null || !selectedItem.criadoEm || !selectedItem.fornecedor.nome) {
            showAlert("Preencha todos os campos!");
            return;
        }

        try {
            await updateEstoque(selectedItem.idMaterial, selectedItem);
            showAlert("Material atualizado com sucesso!")
        } catch (error) {
            console.log("Erro ao atualizar material!\n", error)
            showAlert("Erro ao atualizar material!")
        }

        navigate("/estoque");
        window.location.reload();
    }

    return (
        <div className="relative max-w-full max-h-full bg-gray-800 rounded-lg shadow-md p-2">
            <div onClick={() => {
                navigate('new');
                setSelectedItemMode('create');
                setSelectedItem({
                    criadoEm: new Date(Date.now()).toISOString().split('T')[0],
                    fornecedor: {
                        contato: "",
                        link: "",
                        nome: ""
                    }
                } as Estoque);
            }}
                className="cursor-pointer absolute -top-2 -left-2 rounded-full"
            >
                <FaPlusCircle size={30} className="text-amber-100 hover:text-green-200 transition-all duration-150" />
            </div>
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
                        <tr key={item.idMaterial} className={`hover:bg-gray-700 ${i % 2 == 0 ? 'bg-gray-800' : 'bg-gray-700'}`}>
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
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* form CRUD */}
            {
                selectedItem && (
                    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center px-5">

                        <FaWindowClose size={28}
                            className='cursor-pointer fixed top-5 w-auto bg-red-200 p-0.5 rounded-full text-gray-800'
                            onClick={() => {
                                setSelectedItem(null);
                                navigate('/estoque');
                            }}
                        />
                        <div className="bg-gray-700 rounded-lg shadow-md p-5 w-full max-w-lg h-fit mx-3 max-h-11/12 overflow-y-auto">
                            <h3 className="text-amber-100 text-lg font-bold mb-4">{selectedItemMode == 'edit' ? 'Editar' : 'Criar'} Item</h3>
                            <form onSubmit={selectedItemMode == 'edit' ? handleSubmitEdit : handleSubmitCreate}>
                                <div className="mb-4">
                                    <label className="block text-amber-100 text-sm font-bold mb-2">Produto</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        value={selectedItem.nome}
                                        className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        onChange={(e) =>
                                            setSelectedItem({ ...selectedItem, nome: e.target.value })
                                        }
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
                                        name="criadoEm"
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
                                        {selectedItemMode == 'edit' ? 'Salvar' : 'Criar'}
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
