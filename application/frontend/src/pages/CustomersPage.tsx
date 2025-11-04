import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { CustomerList } from '../components/customers/CustomerList';
import { Pagination } from '../components/ui/Pagination';
import { useCustomers } from '../features/customers/hooks/useCustomers';
import type { Customer } from '../features/customers/customers.types';
import { ConfirmDelete } from '../components/customers/ConfirmDelete';
import { CustomerFormDialog } from '../components/customers/CustomerFormDialog';
import { useSelectedCustomers } from '../features/selectedCustomers/hooks/useSelectedCustomers';


export default function CustomersPage() {
  const { customers, loading, meta, limit, updateItemsPerPage, setPage,page, deleteCustomer,createCustomer,updateCustomer, deleting, saving
  } = useCustomers();
  const { addCustomer } = useSelectedCustomers();
  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [clientRemove, setClientRemove] = useState<Customer | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);


  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    updateItemsPerPage(newLimit);
  };

  const handleDeleteClick = (c: Customer) => {
    setClientRemove(c);
    setConfirmOpen(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (c: Customer) => {
    setEditing(c);
    setFormOpen(true);
  };

  const handleSubmit = async (data: { name: string; salary: number; companyValue: number; userId: number }) => {
    if (editing) {
      await updateCustomer(editing.id, data);
    } else {
      await createCustomer(data);
    }
    setPage(page);
    setFormOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!clientRemove) return;
    try {
      await deleteCustomer(clientRemove.id);
      setConfirmOpen(false);
      setClientRemove(null);
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(meta?.total?? 1 / limit);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-normal"><b>{meta?.total?.toLocaleString('pt-BR')}</b> clientes encontrados</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Clientes por página:</span>
            <select
              value={limit}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Carregando...</p>
        ) : (
          <>
            <CustomerList
              customers={customers}
              onAdd={addCustomer}
              onEdit={handleEdit}
              onDelete={(c) => handleDeleteClick(c)}
            />
            <button className="w-full cursor-pointer rounded-xs border-2 p-2 border-solid border-[#EC6724] text-[#EC6724]" onClick={handleAdd}>Criar cliente</button>
            {totalPages > 1 && (
              <Pagination
                currentPage={meta?.page ?? 1}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            )}
          </>
        )}
      </div>
      <ConfirmDelete
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />
      {
      formOpen && (
        <CustomerFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          mode={editing ? 'edit' : 'create'}
          customer={editing || undefined}
          loading={saving}
          onSubmit={handleSubmit}
        />
  )
      }
      
    </Layout>
  );
}
