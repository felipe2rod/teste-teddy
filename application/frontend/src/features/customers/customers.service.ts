import apiClient from '../../api/apiClient';
import type { CreateCustomerDto, Customer, MetaPagination, UpdateCustomerDto } from './customers.types';

export async function getCustomers(page = 1, limit = 6): Promise<{ items: Customer[]; meta: MetaPagination }> {
  const { data } = await apiClient.get(`/clients?page=${page}&limit=${limit}`);
  return data;
}

export async function deleteCustomerRequest(id: number): Promise<void> {
  await apiClient.delete(`/clients/${id}`);
}

export async function createCustomerRequest(payload: CreateCustomerDto) {
  const { data } = await apiClient.post('/clients', payload);
  return data;
}

export async function updateCustomerRequest(id: number, payload: UpdateCustomerDto) {
  const { data } = await apiClient.patch(`/clients/${id}`, payload);
  return data;
}

