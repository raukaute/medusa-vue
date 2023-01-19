import { fixtures } from '../../../../mocks/data';
import { useRegion, useRegions } from '../../../../src';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useRegions hook', () => {
  test('success', async () => {
    const regions = fixtures.list('region');

    const { vm } = createWrapperComponent(() => useRegions());

    expect(vm.data?.regions).toBeUndefined();

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.regions).toEqual(regions);
  });
});

describe('useRegion hook', () => {
  test('success', async () => {
    const region = fixtures.get('region');

    const { vm } = createWrapperComponent(() => useRegion(region.id));

    expect(vm.data?.region).toBeUndefined();

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.region).toEqual(region);
  });
});
