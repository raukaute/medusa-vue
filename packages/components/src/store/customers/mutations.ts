import {
  StoreCustomersRes,
  StorePostCustomersCustomerReq,
  StorePostCustomersReq,
} from '@medusajs/medusa';
import { useMutation, UseMutationOptions } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';

export const useCreateCustomer = (
  options?: UseMutationOptions<
    StoreCustomersRes,
    Error,
    StorePostCustomersReq,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation(
    (data: StorePostCustomersReq) => client.customers.create(data),
    options
  );
};

export const useUpdateMe = (
  options?: UseMutationOptions<
    StoreCustomersRes,
    Error,
    { id: string } & StorePostCustomersCustomerReq,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation(
    ({ id, ...data }: { id: string } & StorePostCustomersCustomerReq) =>
      client.customers.update(data),
    options
  );
};
