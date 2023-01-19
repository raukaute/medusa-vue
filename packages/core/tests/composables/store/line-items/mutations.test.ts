import { fixtures } from '../../../../mocks/data';
import {
  useCreateLineItem,
  useDeleteLineItem,
  useUpdateLineItem,
} from '../../../../src/';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useCreateLineItem hook', () => {
  test('creates a line item', async () => {
    const lineItem = {
      variant_id: 'test-variant',
      quantity: 1,
    };

    const { vm } = createWrapperComponent(() => useCreateLineItem('test-cart'));

    vm.mutate(lineItem);

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.cart.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...lineItem,
        }),
      ])
    );
  });
});

describe('useUpdateLineItem hook', () => {
  test('updates a line item', async () => {
    const lineItem = {
      lineId: 'some-item-id',
      quantity: 3,
    };

    const { vm } = createWrapperComponent(() => useUpdateLineItem('test-cart'));

    vm.mutate(lineItem);

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.cart.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: lineItem.lineId,
          quantity: lineItem.quantity,
        }),
      ])
    );
  });
});

describe('useDeleteLineItem hook', () => {
  test('deletes a line item', async () => {
    const lineItem = {
      lineId: 'some-item-id',
    };

    const { vm } = createWrapperComponent(() => useDeleteLineItem('test-cart'));

    vm.mutate(lineItem);

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.cart).toEqual(fixtures.get('cart'));
  });
});
