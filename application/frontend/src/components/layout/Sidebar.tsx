import { NavLink } from 'react-router-dom';
import { Users, Home, UserCheck } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside className={`
      w-70 bg-gray-50 border-r h-screen p-4 space-y-2 
      transition-all duration-300 ease-in-out border-r-white
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      fixed lg:relative z-10 lg:translate-x-0 lg:z-0
      ${isOpen ? '' : 'lg:hidden'}
    `}>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
            }`
          }
        >
          <Home size={18} /> Início
        </NavLink>

        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
            }`
          }
        >
          <Users size={18} /> Clientes
        </NavLink>

        <NavLink
          to="/clientes-selecionados"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
            }`
          }
        >
          <UserCheck size={18} /> Clientes selecionados
        </NavLink>
      </nav>
    </aside>
  );
}