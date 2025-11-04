import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../auth/AuthProvider";
import { logout } from "../../auth/auth.service";
import logo from "../../../public/logo.png"
import { useSelectedCustomers } from "../../features/selectedCustomers/hooks/useSelectedCustomers";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { user } = useAuthContext();
  const { selectedCustomers } = useSelectedCustomers();

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-6 border-b-2 border-b-solid border-b-[#D9D9D9]">
        <div className="flex gap-3">
          <button className="cursor-pointer" onClick={onToggleSidebar}>
            <Menu />
          </button>
          <img 
            src={logo} 
            alt="Logo"
            className="h-14 w-auto" // Ajuste a altura conforme necessário
          />
        </div>
        
        <nav className="flex items-center gap-6">
            <Link 
                to="/" 
                className="text-gray-700 hover:text-[#EC6724] hover:underline transition-colors text-sm">
                Clientes
            </Link>
            <Link 
                to="/clientes-selecionados" 
                className="text-gray-700 hover:text-[#EC6724] hover:underline transition-colors text-sm">
                Clientes selecionados  {selectedCustomers.length > 0 && ` (${selectedCustomers.length})`}
            </Link>
            <a 
                href="#" 
                onClick={logout}
                className="text-gray-700 hover:text-[#EC6724] hover:underline transition-colors text-sm">
                Sair
            </a>
        </nav>
        <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Olá, <b>{user?.name}</b></span>
        </div>
    </header>
  );
}
