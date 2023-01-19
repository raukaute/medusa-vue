import { fixtures } from '../../../../mocks/data';
import { useProduct, useProducts } from '../../../../src';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useProducts hook', () => {
  test('gets a list of products', async () => {
    const { vm } = createWrapperComponent(() => useProducts());

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.products).toEqual(fixtures.list('product'));
  });

  test('gets a list of products based on limit and offset', async () => {
    const { vm } = createWrapperComponent(() =>
      useProducts({
        limit: 2,
        offset: 5,
      })
    );

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.products).toEqual(fixtures.list('product'));
    expect(vm.data?.limit).toEqual(2);
    expect(vm.data?.offset).toEqual(5);
  });
});

describe('useProducts hook', () => {
  test('success', async () => {
    const { vm } = createWrapperComponent(() =>
      useProduct('prod_01F0YESHQ27Y31CAMD0NV6W9YP')
    );

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.product).toEqual(fixtures.get('product'));
  });
});
