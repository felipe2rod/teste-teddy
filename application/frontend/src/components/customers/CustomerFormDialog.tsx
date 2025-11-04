import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';
import type { CreateCustomerDto, Customer, UpdateCustomerDto } from '../../features/customers/customers.types';
import { createCustomerRequest as createCustomer, updateCustomerRequest as updateCustomer } from '../../features/customers/customers.service';
import { useCustomers } from '../../features/customers/hooks/useCustomers';

interface CustomerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  customer?: Customer;
  loading?: boolean;
  onSubmit?: (data: CreateCustomerDto | UpdateCustomerDto) => Promise<void>;
}

export function CustomerFormDialog({
  open,
  onOpenChange,
  mode,
  customer,
  loading = false,
  onSubmit,
}: CustomerFormDialogProps) {
  const isEdit = mode === 'edit';
  const { setPage } = useCustomers();

  const [formData, setFormData] = useState<CreateCustomerDto>({
    name: '',
    salary: 0,
    companyValue: 0,
    userId: 1
  });

  // Preenche dados quando em modo edição
  useEffect(() => {
    if (isEdit && customer) {
      setFormData({
        name: customer.name,
        salary: parseFloat(customer.salary),
        companyValue: parseFloat(customer.companyValue),
        userId: customer.userId
      });
    } else {
      setFormData({ name: '', salary: 0, companyValue: 0, userId: 1 });
    }
  }, [customer, isEdit]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'salary' || name === 'companyValue') {
      const numeric = value.replace(/[^\d]/g, '');
      const formatted = Number(numeric) / 100;
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const formatCurrency = (value: number) => {
    if (!value) return '';
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      await onSubmit(formData);
    } else {
      try {
        if (isEdit && customer?.id) {
          await updateCustomer(customer.id, formData);
        } else {
          await createCustomer(formData);
        }
        await setPage(1);
        onOpenChange(false);
      } catch (error) {
        console.error('Erro ao salvar cliente:', error);
      }
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-90" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xs bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">
            {isEdit ? 'Editar Cliente' : 'Cadastrar Cliente'}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xs px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salário
              </label>
              <input
                type="text"
                name="salary"
                value={formatCurrency(formData.salary)}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xs px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor da Empresa
              </label>
              <input
                type="text"
                name="companyValue"
                value={formatCurrency(formData.companyValue)}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xs px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 text-sm rounded-xs border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm rounded-xs bg-[#EC6724] text-white disabled:opacity-60"
              >
                {loading ? 'Salvando...' : isEdit ? 'Salvar Alterações' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}