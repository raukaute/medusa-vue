import { useCreateReturn } from '../../../../src';
import { fixtures } from '../../../../mocks/data';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useCreateReturn hook', () => {
  test('creates a return', async () => {
    const ret = {
      order_id: 'order_38',
      items: [
        {
          item_id: 'test-item',
          quantity: 1,
        },
      ],
    };

    const { vm } = createWrapperComponent(() => useCreateReturn());

    vm.mutate(ret);

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.return).toEqual(
      expect.objectContaining({
        ...fixtures.get('return'),
        order_id: ret.order_id,
      })
    );
  });
});
