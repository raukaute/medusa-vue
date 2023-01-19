import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/vue-query';
import { Response } from '@medusajs/medusa-js';

import {
  StoreOrderEditsRes,
  StorePostOrderEditsOrderEditDecline,
} from '@medusajs/medusa';

import { buildOptions } from '../../utils/buildOptions';
import { useMedusa } from '../../../useApi';
import { orderEditQueryKeys } from '.';

export const useDeclineOrderEdit = (
  id: string,
  options?: UseMutationOptions<
    Response<StoreOrderEditsRes>,
    Error,
    StorePostOrderEditsOrderEditDecline,
    unknown
  >
) => {
  const { client } = useMedusa();
  const queryClient = useQueryClient();

  return useMutation(
    (payload: StorePostOrderEditsOrderEditDecline) =>
      client.orderEdits.decline(id, payload),
    buildOptions(
      queryClient,
      [orderEditQueryKeys.lists(), orderEditQueryKeys.detail(id)],
      options
    )
  );
};

export const useCompleteOrderEdit = (
  id: string,
  options?: UseMutationOptions<
    Response<StoreOrderEditsRes>,
    Error,
    void,
    unknown
  >
) => {
  const { client } = useMedusa();
  const queryClient = useQueryClient();

  return useMutation(
    () => client.orderEdits.complete(id),
    buildOptions(
      queryClient,
      [orderEditQueryKeys.lists(), orderEditQueryKeys.detail(id)],
      options
    )
  );
};
