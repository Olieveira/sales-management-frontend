import React from 'react';
import { Link} from 'react-router-dom';

// Definindo o tipo para os itens do menu
interface MenuItem {
  label: string;
  path: string;
}

const Header: React.FC = () => {
  // Definindo os itens do menu
  const menuItems: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Produtos', path: '/produtos' },
  ];

  return (
    <header className="bg-gray-800 text-white p-4 static w-screen h-16 z-10 shadow-lg shadow-neutral-600">
      <div className="container mx-auto flex justify-between items-center z-10">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Creative Mimos</h1>

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
