import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { HiOutlineInformationCircle, HiArrowUp, HiArrowDown } from 'react-icons/hi'


interface AlertProps {
    message: string
}

export const Alert: React.FC<AlertProps> = ({ message }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -30, x: '-50%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-8 left-1/2 bg-gray-700 text-gray-300 border border-gray-500 shadow-xl rounded-lg sm:px-6 px-0 py-4 z-50 flex items-center gap-3 max-w-screen w-full sm:w-auto h-auto"
            style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
        >
            <HiOutlineInformationCircle className="w-6 h-6 text-amber-50 flex-shrink-0" />
            <span className="font-medium text-base whitespace-normal break-words">{message}</span>
        </motion.div>

    );
}

interface AlertSelectProps {
    message: string
    selectType: 'number' | 'boolean'
    handleSelect: (selected: number | boolean) => void;
}

export const AlertSelect: React.FC<AlertSelectProps> = ({ message, selectType, handleSelect }) => {
    const [currentNum, setCurrentNum] = useState<number>(1)

    return (
        <motion.div
            initial={{ opacity: 0, y: -30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -30, x: '-50%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='fixed w-full h-full top-0 left-1/2 flex justify-center items-center bg-gray-950/70 z-20'
        >

            <div className='flex flex-col'>
                <motion.div
                    className="bg-gray-800 text-gray-300 border border-gray-500 shadow-xl rounded-lg sm:px-6 px-2 py-4 z-50 flex items-center gap-3 max-w-screen w-full sm:w-auto h-auto"
                    style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
                >
                    <HiOutlineInformationCircle className="w-6 h-6 text-amber-50 flex-shrink-0" />
                    <span className="font-medium text-base whitespace-normal break-words">{message}</span>
                </motion.div>

                {selectType === 'boolean' && (
                    <div className="flex gap-4 justify-center mt-4">
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow"
                            onClick={() => handleSelect(true)}
                        >
                            Sim
                        </button>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow"
                            onClick={() => handleSelect(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                )}

                {selectType === 'number' && (
                    <div className='gap-6 flex flex-col justify-center items-center'>
                        <div className="flex gap-4 justify-center mt-4 items-center">
                            <HiArrowUp
                                className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-3 rounded shadow flex items-center cursor-pointer"
                                onClick={() => setCurrentNum((prev) => prev += 1)}
                                aria-label="Aumentar"
                            />
                            <input
                                type="text"
                                inputMode='numeric'
                                min={0}
                                max={9999}
                                value={currentNum}
                                className="w-16 text-center flex items-center justify-center py-2 px-2 rounded border border-gray-400 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none hide-number-spin"
                                onChange={(e) => {
                                    setCurrentNum(Number(e.target.value));
                                }}
                            />
                            <HiArrowDown
                                className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-3 rounded shadow flex items-center cursor-pointer"
                                onClick={() => setCurrentNum((prev) => prev > 0 ? prev -= 1 : prev)}
                                aria-label="Diminuir"
                            />
                        </div>
                        <div className='cursor-pointer hover:bg-gray-800 hover:border-0 transition-all bg-gray-900 text-amber-200 border-amber-200 border-2 text- w-24 h-10 rounded-2xl p-1 flex justify-center items-center text-center'
                            onClick={() => handleSelect(currentNum)}
                        >
                            confirmar
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}