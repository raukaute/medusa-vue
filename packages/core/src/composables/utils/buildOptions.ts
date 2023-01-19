import { QueryClient, QueryKey, UseMutationOptions } from '@tanstack/vue-query';

export const buildOptions = <
  TData,
  TError,
  TVariables,
  TContext,
  TKey extends Array<QueryKey>
>(
  queryClient: QueryClient,
  queryKey?: TKey[] | TKey,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationOptions<TData, TError, TVariables, TContext> => {
  return {
    ...options,
    onSuccess: (...args) => {
      if (options?.onSuccess) {
        return options.onSuccess(...args);
      }

      if (queryKey !== undefined) {
        if (queryKey.filter(Array.isArray).length > 0) {
          queryKey.forEach(key => queryClient.invalidateQueries(key));
        } else {
          queryClient.invalidateQueries(queryKey);
        }
      }
    },
  };
};
