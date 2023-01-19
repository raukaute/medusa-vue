import { fixtures } from '../../../../mocks/data';
import { useCollections, useCollection } from '../../../../src';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useCollections hook', () => {
  test('returns a list of collections', async () => {
    const { vm } = createWrapperComponent(() => useCollections());

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.collections).toEqual(fixtures.list('product_collection'));
  });
});

describe('useCollection hook', () => {
  test('returns a collection', async () => {
    const collection = fixtures.get('product_collection');
    const { vm } = createWrapperComponent(() => useCollection(collection.id));

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.collection).toEqual(collection);
  });
});
