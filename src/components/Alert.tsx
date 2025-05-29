import { motion } from 'framer-motion'
import { HiOutlineInformationCircle } from 'react-icons/hi'


interface AlertProps {
    message: string
}

export function Alert({ message }: AlertProps) {
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