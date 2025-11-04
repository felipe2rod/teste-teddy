import { useEffect, useState } from 'react';
import type { CreateCustomerDto, Customer, MetaPagination, UpdateCustomerDto } from '../customers.types';
import { getCustomers, deleteCustomerRequest, createCustomerRequest, updateCustomerRequest } from '../customers.service';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [meta, setMeta] = useState<MetaPagination>();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (currentPage = page, currentLimit = limit) => {
    setLoading(true);
    try {
      const result = await getCustomers(currentPage, currentLimit);
      setCustomers(result.items);
      setMeta(result.meta);
    } finally {
      setLoading(false);
    }
  };


  const updateItemsPerPage = async (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    await fetchData(1, newLimit);
  };

  const deleteCustomer = async (id: number) => {
    setDeleting(true);
    setError(null);
    try {
      await deleteCustomerRequest(id);
      await fetchData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Erro ao excluir cliente');
      throw err;
    } finally {
      setDeleting(false);
    }
  };

  const createCustomer = async (payload: CreateCustomerDto) => {
    setSaving(true);
    try {
      await createCustomerRequest(payload);
      await fetchData();
    } finally {
      setSaving(false);
    }
  };

  const updateCustomer = async (id: number, payload: UpdateCustomerDto) => {
    setSaving(true);
    try {
      await updateCustomerRequest(id, payload);
      await fetchData();
    } finally {
      setSaving(false);
    }
  };


  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { 
    customers, 
    loading, 
    page, 
    setPage, 
    meta, 
    limit, 
    updateItemsPerPage ,
    deleteCustomer,
    createCustomer,
    updateCustomer,
    deleting,
    saving,
    error,
  };
}