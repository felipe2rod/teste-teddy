import type { Customer } from "../../features/customers/customers.types";
import { Edit, Trash2, Plus, Minus } from 'lucide-react';

interface Props {
  customer: Customer;
  onAdd: (c: Customer) => void;
  onEdit: (c: Customer) => void;
  onDelete: (c: Customer) => void;
  selectedCustomer?: boolean;
}

export function CustomerPanel({ customer, onEdit, onDelete, onAdd, selectedCustomer = false }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 rounded-xs border border-[#D9D9D9] hover:shadow-md transition">
      <div className="flex flex-col items-center">
          <h3 className="text-base w-full text-center font-semibold text-gray-800">{customer.name}</h3>
          <p className="text-sm mt-2 w-full text-center text-gray-500">{Number(customer.salary).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}</p>
          <p className="text-sm mt-2 w-full text-center text-gray-500">{Number(customer.companyValue).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}</p>        
      </div>
      <div className="flex justify-between mt-4">
         <button
            onClick={() => onAdd(customer)}
            className="p-2 cursor-pointer"
          >
            {!selectedCustomer ? <Plus size={16} /> : <Minus size={16} />}
          </button>
          <button
            onClick={() => onEdit(customer)}
            className="p-2 cursor-pointer"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(customer)}
            className="p-2 cursor-pointer"
          >
            <Trash2 size={16} color="red"/>
          </button>
        </div>
    </div>
  );
}
