export interface Customer {
  id: number;
  name: string;
  salary: string;
  companyValue: string;
}

export interface MetaPagination {
  total: number,
  page: number,
  limit: number,
  last_page: number
}

export interface CreateCustomerDto {
  name: string,
  salary: number,
  companyValue: number
  userId: number,
}

export interface UpdateCustomerDto {
  name: string,
  salary: number,
  companyValue: number,
  userId: number,
}

export interface Customer {
  id: number;
  name: string;
  salary: string;
  companyValue: string;
  userId: number;
}