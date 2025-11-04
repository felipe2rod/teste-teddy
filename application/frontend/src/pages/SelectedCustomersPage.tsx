import { Layout } from '../components/layout/Layout';
import { CustomerList } from '../components/customers/CustomerList';
import { useSelectedCustomers } from '../features/selectedCustomers/hooks/useSelectedCustomers';

export default function SelectedCustomersPage() {
  const { selectedCustomers, clearAll, removeCustomer } = useSelectedCustomers();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-normal">
            <b>{selectedCustomers.length}</b> clientes selecionados
          </h2>

          
        </div>

        {selectedCustomers.length === 0 ? (
          <p className="text-gray-500 text-center">
            Nenhum cliente selecionado ainda.
          </p>
        ) : (
          <CustomerList
            customers={selectedCustomers}
            onAdd={() => {}}
            onEdit={(c) => console.log('editar', c)}
            onDelete={(c) => removeCustomer(c.id!)}
            selectedCustomer={true}
          />
        )}
        {selectedCustomers.length > 0 && (
            <button
              onClick={clearAll}
              className="rounded-xs w-full border border-red-500 text-red-500 px-4 py-2 text-sm hover:bg-red-50 transition-colors"
            >
              Limpar seleção
            </button>
          )}
      </div>
    </Layout>
  );
}
