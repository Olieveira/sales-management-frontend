import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaWarehouse, FaBoxes } from 'react-icons/fa';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const Header: React.FC = () => {

  const menuItems: MenuItem[] = [
    { label: 'Home', path: '/', icon: <FaHome /> },
    { label: 'Produtos', path: '/produtos', icon: <FaBoxes /> },
    { label: 'Vendas', path: '/vendas', icon: <FaShoppingCart /> },
    { label: 'Estoque', path: '/estoque', icon: <FaWarehouse /> },
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
                  className="hover:text-gray-400 transition-colors flex items-center"
                >
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden text-xl">{item.icon}</span>
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
