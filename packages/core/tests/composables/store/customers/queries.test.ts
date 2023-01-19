import { rest } from 'msw';
import { fixtures } from '../../../../mocks/data';
import { server } from '../../../../mocks/server';
import { useCustomerOrders, useMeCustomer } from '../../../../src';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useMeCustomer hook', () => {
  test('returns customer', async () => {
    const { vm } = createWrapperComponent(() => useMeCustomer());

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.customer).toEqual(fixtures.get('customer'));
  });
});

describe('useCustomerOrders hook', () => {
  test("returns customer's orders", async () => {
    const orders = fixtures.list('order', 5);

    const { vm } = createWrapperComponent(() => useCustomerOrders());

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.orders).toEqual(orders);
    expect(vm.data?.limit).toEqual(5);
    expect(vm.data?.offset).toEqual(0);
  });

  test("propagates query params and returns customer's orders", async () => {
    const orders = fixtures.list('order');

    server.use(
      rest.get('/store/customers/me/orders', (req, res, ctx) => {
        const limit = req.url.searchParams.get('limit');
        const offset = req.url.searchParams.get('offset');
        const expand = req.url.searchParams.get('expand');
        const fields = req.url.searchParams.get('fields');
        expect({
          limit,
          offset,
          expand,
          fields,
        }).toEqual({
          limit: '2',
          offset: '5',
          expand: 'relation_1,relation_2',
          fields: 'field_1,field_2',
        });
        return res(
          ctx.status(200),
          ctx.json({
            orders,
            limit: 2,
            offset: 5,
          })
        );
      })
    );

    const { vm } = createWrapperComponent(() =>
      useCustomerOrders({
        limit: 2,
        offset: 5,
        expand: 'relation_1,relation_2',
        fields: 'field_1,field_2',
      })
    );

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.orders).toEqual(orders);
    expect(vm.data?.limit).toEqual(2);
    expect(vm.data?.offset).toEqual(5);
  });
});
