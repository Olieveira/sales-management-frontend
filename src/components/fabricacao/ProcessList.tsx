import React from "react";
import { useProcessos } from "../../hooks/useProcessos";
import { NenhumRegistroMini } from "../NenhumRegistro";

export const ProcessList: React.FC = () => {
    const { data: processos, isLoading, error } = useProcessos();

    return (
        <section className="rounded-2xl bg-gray-900 w-56 sm:w-full shadow-md shadow-slate-600/20">
            <div className="p-2 text-center">
                <h2 className="font-semibold text-xl text-amber-100">Novo Processo</h2>
            </div>
            <div className="rounded-b-2xl from-gray-900 to-gray-800 bg-gradient-to-b shadow-md shadow-slate-600/20 min-h-52 flex flex-col gap-y-5">
                {processos && processos.length > 0 ? processos.map((processo, i) => (
                    <div className="text-amber-100 flex flex-row justify-center gap-5 p-2" key={i}>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <div>{processo.nome}</div>
                            <div>{processo.descricao}</div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <div>{processo.idCategoria}</div>
                            <div>{processo.idProcesso}</div>
                            <div>{processo.criadoEm instanceof Date ? processo.criadoEm.toLocaleString() : processo.criadoEm}</div>
                        </div>
                    </div>
                )) : <NenhumRegistroMini pagina="processo" />}
            </div>
        </section>
    )
}