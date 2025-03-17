import React from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
  label: string;
  path: string;
}

const Header: React.FC = () => {

  const menuItems: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Produtos', path: '/produtos' },
    { label: 'Vendas', path: '/vendas' },
  ];

  return (
    <header className="flex items-center w-screen h-16 bg-gray-800 text-white shadow-lg shadow-neutral-600">
      <div className="flex w-full justify-between px-6 items-center">
        <Link to={menuItems[0].path}>
          <h1 className="text-2xl font-bold hidden sm:block">Creative Mimos</h1>
          <div className="bg-cover w-14 h-14 rounded-2xl bg-[url(./assets/logo.png)] sm:hidden" />
        </Link>
        {/* Menu de navegação */}
        <nav>
          <ul className="flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="hover:text-gray-400 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
