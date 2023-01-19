import { useRequestOrderAccess, useGrantOrderAccess } from '../../../../src/';

import { createWrapperComponent, waitFor } from '../../../utils';

describe('useGrantOrderAccess hook', () => {
  test('Grant access to token', async () => {
    const { vm } = createWrapperComponent(() => useGrantOrderAccess());

    vm.mutate({ token: 'store_order_edit' });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
  });
});

describe('useRequestOrderAccess hook', () => {
  test('Requests access to ids', async () => {
    const { vm } = createWrapperComponent(() => useRequestOrderAccess());

    vm.mutate({ order_ids: [''] });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
  });
});
