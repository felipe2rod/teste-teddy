import { create } from 'zustand';
import type { Customer } from '../../customers/customers.types';

interface SelectedCustomersState {
  selectedCustomers: (Customer)[];
  addCustomer: (customer: Customer) => void;
  removeCustomer: (id: number) => void;
  clearAll: () => void;
}

export const useSelectedCustomersStore = create<SelectedCustomersState>((set, get) => ({
  selectedCustomers: [],

  addCustomer: (customer) => {
    const exists = get().selectedCustomers.some(c => c.id === customer.id);
    if (!exists) {
      set(state => ({
        selectedCustomers: [...state.selectedCustomers, customer],
      }));
    }
  },

  removeCustomer: (id) => {
    set(state => ({
      selectedCustomers: state.selectedCustomers.filter(c => c.id !== id),
    }));
  },

  clearAll: () => set({ selectedCustomers: [] }),
}));
