import { fixtures } from '../../../../mocks/data';
import { useCreateCustomer, useUpdateMe } from '../../../../src/';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useCreateCustomer hook', () => {
  test('creates a new customer', async () => {
    const customer = {
      first_name: 'john',
      last_name: 'wick',
      email: 'johnwick@medusajs.com',
      password: 'supersecret',
      phone: '111111',
    };

    const { vm } = createWrapperComponent(() => useCreateCustomer());

    vm.mutate(customer);

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.customer).toEqual({
      ...fixtures.get('customer'),
      ...customer,
    });
  });
});

describe('useUpdateMe hook', () => {
  test('updates current customer', async () => {
    const customer = {
      first_name: 'lebron',
      last_name: 'james',
      email: 'lebronjames@medusajs.com',
      password: 'supersecret',
      phone: '111111',
    };

    const { vm } = createWrapperComponent(() => useUpdateMe());

    vm.mutate({
      id: 'cus_test',
      ...customer,
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.customer).toEqual({
      ...fixtures.get('customer'),
      ...customer,
    });
  });
});
