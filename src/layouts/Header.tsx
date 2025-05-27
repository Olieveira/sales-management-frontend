import React from 'react';

const Header: React.FC = () => {

  return (
    <header className="h-20 flex items-center justify-center bg-gradient-to-b shadow-md shadow-slate-500/30 from-gray-900/70 to-gray-950/80">
      <h1 className="text-white text-2xl font-bold tracking-wide">Gerenciador de vendas</h1>
    </header>
  )
};

export default Header;
