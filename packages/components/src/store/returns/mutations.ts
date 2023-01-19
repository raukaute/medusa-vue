import { StoreReturnsRes, StorePostReturnsReq } from '@medusajs/medusa';
import { useMutation, UseMutationOptions } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';

export const useCreateReturn = (
  options?: UseMutationOptions<
    StoreReturnsRes,
    Error,
    StorePostReturnsReq,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation(
    (data: StorePostReturnsReq) => client.returns.create(data),
    options
  );
};
