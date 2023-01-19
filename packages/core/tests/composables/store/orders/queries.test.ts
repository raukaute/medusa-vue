import { useOrders } from '../../../../src/';
import { rest } from 'msw';
import { server } from '../../../../mocks/server';
import { useCartOrder, useOrder } from '../../../../src/';
import { fixtures } from '../../../../mocks/data';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useOrder hook', () => {
  test('returns an order', async () => {
    const order = fixtures.get('order');

    const { vm } = createWrapperComponent(() => useOrder(order.id));

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.order).toEqual(order);
  });
});

describe('useCartOrder hook', () => {
  test('returns a cart order', async () => {
    const order = fixtures.get('order');

    const { vm } = createWrapperComponent(() => useCartOrder('test_cart'));

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.order).toEqual(order);
  });
});

describe('useOrders hook', () => {
  test('propagates the query params and returns an order', async () => {
    const order = fixtures.get('order');
    const displayId = 400,
      emailParam = 'customer@test.com';

    server.use(
      rest.get('/store/orders', (req, res, ctx) => {
        const display_id = req.url.searchParams.get('display_id');
        const email = req.url.searchParams.get('email');
        expect({
          display_id,
          email,
        }).toEqual({
          email: emailParam,
          display_id: displayId.toString(),
        });
        return res(
          ctx.status(200),
          ctx.json({
            order,
          })
        );
      })
    );

    const { vm } = createWrapperComponent(() =>
      useOrders({
        display_id: displayId,
        email: emailParam,
      })
    );

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.order).toEqual(order);
  });
});
