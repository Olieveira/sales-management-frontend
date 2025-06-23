import React, { useEffect } from "react";
import { useVendasProcessos } from "../../hooks/useVendasProcessos";
import { useEtapasProcessosVendas } from "../../hooks/useEtapasProcessosVendas";


export const HistoricProcess: React.FC = () => {
    const { data: vendasProcessos } = useVendasProcessos();
    const { data: etapasProcessosVendas } = useEtapasProcessosVendas();

    useEffect(() => {
        console.log("vendas Processos recebido:\n", vendasProcessos)
    }, [vendasProcessos])

    return (
        <section className="rounded-2xl bg-gray-900 w-56 sm:w-full shadow-md shadow-slate-600/20">
            <div className="p-2 text-center">
                <h2 className="font-semibold text-xl text-amber-100">Processos Recentes</h2>
            </div>
            <div className="rounded-b-2xl from-gray-900 to-gray-800 bg-gradient-to-b shadow-md shadow-slate-600/20 min-h-52 p-2 flex flex-col gap-2">
                {vendasProcessos && vendasProcessos.length > 0 ? (
                    vendasProcessos.slice(0, 6).map((processo) => (
                        <div key={processo.idProcesso + '-' + processo.idVenda} className="bg-gray-800 rounded-lg p-2 flex flex-col text-amber-100 shadow">
                            <span className="font-semibold">Processo #{processo.idProcesso}</span>
                            <span className="text-xs text-gray-300">Venda: {processo.idVenda}</span>
                            <span className="text-xs">Status: {processo.idStatusProcesso}</span>
                            <span className="text-xs">Iniciado: {processo.iniciadoEm ? new Date(processo.iniciadoEm).toLocaleDateString() : '-'}</span>
                            <span className="text-xs">Concluído: {processo.concluidoEm ? new Date(processo.concluidoEm).toLocaleDateString() : '-'}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400 py-6">Nenhum processo recente encontrado.</div>
                )}
            </div>
        </section>
    )
}