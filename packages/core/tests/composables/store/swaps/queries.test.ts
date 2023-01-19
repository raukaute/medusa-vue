import { useCartSwap } from '../../../../src/';

import { fixtures } from '../../../../mocks/data';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useCartSwap hook', () => {
  test('returns a swap', async () => {
    const swap = fixtures.get('swap');

    const { vm } = createWrapperComponent(() => useCartSwap('cart_test'));

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.swap).toEqual(swap);
  });
});
