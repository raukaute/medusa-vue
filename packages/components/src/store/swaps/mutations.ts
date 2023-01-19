import { StoreSwapsRes, StorePostSwapsReq } from '@medusajs/medusa';
import { useMutation, UseMutationOptions } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';

export const useCreateSwap = (
  options?: UseMutationOptions<StoreSwapsRes, Error, StorePostSwapsReq, unknown>
) => {
  const { client } = useMedusa();
  return useMutation(
    (data: StorePostSwapsReq) => client.swaps.create(data),
    options
  );
};
