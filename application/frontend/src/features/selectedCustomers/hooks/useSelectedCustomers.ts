import { useSelectedCustomersStore } from '../store/selectedCustomers.store';

export const useSelectedCustomers = () => {
  const {
    selectedCustomers,
    addCustomer,
    removeCustomer,
    clearAll,
  } = useSelectedCustomersStore();

  return {
    selectedCustomers,
    addCustomer,
    removeCustomer,
    clearAll,
  };
};
