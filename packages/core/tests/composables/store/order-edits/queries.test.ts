import { fixtures } from '../../../../mocks/data';
import { createWrapperComponent, waitFor } from '../../../utils';
import { useOrderEdit } from '../../../../src';

describe('useOrderEdit hook', () => {
  test('returns an order', async () => {
    const store_order_edit = fixtures.get('store_order_edit');

    const { vm } = createWrapperComponent(() =>
      useOrderEdit(store_order_edit.id)
    );

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.order_edit).toEqual(store_order_edit);
  });
});
