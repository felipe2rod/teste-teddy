import { CustomerPanel } from './CustomerPanel';
import type { Customer } from '../../features/customers/customers.types';

interface Props {
  customers: Customer[];
  onEdit: (c: Customer) => void;
  onDelete: (c: Customer) => void;
  onAdd: (c: Customer) => void;
  selectedCustomer?: boolean;
}

export function CustomerList({ customers, onEdit, onDelete, onAdd, selectedCustomer = false }: Props) {
  if (!customers.length) {
    return <p className="text-gray-500 text-center">Nenhum cliente encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {customers.map((c) => (
        <CustomerPanel key={c.id} customer={c} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} selectedCustomer={selectedCustomer} />
      ))}
    </div>
  );
}
