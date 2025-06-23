import React from "react";
import { HistoricProcess } from "../components/fabricacao/HistoricProcess";
import { ProcessList } from "../components/fabricacao/ProcessList";

export const Fabricacao: React.FC = () => {
    return (
        <div className="w-full h-fit p-10">
            <h1 className="text-4xl font-bold text-amber-50 text-center mb-16">
                Fabricação
            </h1>

            <div className="w-full h-fit flex flex-row flex-wrap justify-center gap-6">
                <div className="flex-2 flex justify-center w-auto">
                    <HistoricProcess />
                </div>
                <div className="flex-1 flex justify-center">
                    <ProcessList />
                </div>
            </div>
        </div>
    )
} 