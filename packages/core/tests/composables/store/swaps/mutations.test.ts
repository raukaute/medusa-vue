import { useCreateSwap } from '../../../../src/';
import { fixtures } from '../../../../mocks/data';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useCreateSwap hook', () => {
  test('creates a return', async () => {
    const swap = {
      order_id: 'order_test',
      additional_items: [
        {
          variant_id: 'new-item',
          quantity: 1,
        },
      ],
      return_items: [
        {
          item_id: 'return-item',
          quantity: 1,
        },
      ],
    };

    const { vm } = createWrapperComponent(() => useCreateSwap());

    vm.mutate(swap);

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.swap).toEqual(
      expect.objectContaining({
        ...fixtures.get('swap'),
        order_id: swap.order_id,
      })
    );
  });
});
