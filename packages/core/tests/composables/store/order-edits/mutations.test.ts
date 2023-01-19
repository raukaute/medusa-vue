import { useCompleteOrderEdit, useDeclineOrderEdit } from '../../../../src/';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useDeclineOrderEdit hook', () => {
  test('decline an order edit', async () => {
    const declineBody = {
      declined_reason: 'Wrong color',
    };

    const { vm } = createWrapperComponent(() =>
      useDeclineOrderEdit('store_order_edit')
    );

    vm.mutate(declineBody);

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.order_edit).toEqual(
      expect.objectContaining({
        status: 'declined',
        ...declineBody,
      })
    );
  });
});

describe('useCompleteOrderEdit hook', () => {
  test('complete an order edit', async () => {
    const { vm } = createWrapperComponent(() =>
      useCompleteOrderEdit('store_order_edit')
    );

    vm.mutate();

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.order_edit).toEqual(
      expect.objectContaining({
        status: 'confirmed',
      })
    );
  });
});
