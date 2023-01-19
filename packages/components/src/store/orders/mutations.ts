import {
  StorePostCustomersCustomerAcceptClaimReq,
  StorePostCustomersCustomerOrderClaimReq,
} from '@medusajs/medusa';
import { Response } from '@medusajs/medusa-js';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/vue-query';
import { orderKeys } from './queries';
import { useMedusa } from '../../../useApi';
import { buildOptions } from '../../utils/buildOptions';

export const useRequestOrderAccess = (
  options?: UseMutationOptions<
    Response<{}>,
    Error,
    StorePostCustomersCustomerOrderClaimReq,
    unknown
  >
) => {
  const { client } = useMedusa();
  const queryClient = useQueryClient();

  return useMutation(
    (payload: StorePostCustomersCustomerOrderClaimReq) =>
      client.orders.requestCustomerOrders(payload),
    buildOptions(queryClient, [orderKeys.all], options)
  );
};
export const useGrantOrderAccess = (
  options?: UseMutationOptions<
    Response<{}>,
    Error,
    StorePostCustomersCustomerAcceptClaimReq,
    unknown
  >
) => {
  const { client } = useMedusa();
  const queryClient = useQueryClient();

  return useMutation(
    (payload: StorePostCustomersCustomerAcceptClaimReq) =>
      client.orders.confirmRequest(payload),
    buildOptions(queryClient, [orderKeys.all], options)
  );
};
