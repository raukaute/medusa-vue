import { queryKeysFactory } from '../../utils/index';
import { StoreCartsRes } from '@medusajs/medusa';
import { Response } from '@medusajs/medusa-js';
import { useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import { UseQueryOptionsWrapper } from '../../../types';

const CARTS_QUERY_KEY = `carts` as const;

export const cartKeys = queryKeysFactory(CARTS_QUERY_KEY);
type CartQueryKey = typeof cartKeys;

export const useGetCart = (
  id: string,
  options?: UseQueryOptionsWrapper<
    Response<StoreCartsRes>,
    Error,
    ReturnType<CartQueryKey['detail']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery(
    cartKeys.detail(id),
    () => client.carts.retrieve(id),
    options
  );
  return { data, ...rest } as const;
};
