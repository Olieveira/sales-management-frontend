import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const Header: React.FC = () => {

  return (
    <AnimatePresence>
      <motion.header className="z-20 h-20 flex items-center justify-center bg-gradient-to-b shadow-md shadow-slate-500/30 from-gray-900/70 to-gray-950/80"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut', type: 'spring' }}
      >
        <h1 className="text-white text-2xl font-bold tracking-wide">Gerenciador de vendas</h1>
      </motion.header>
    </AnimatePresence>
  )
};

export default Header;
