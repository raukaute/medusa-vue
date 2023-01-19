import { fixtures } from '../../../../mocks/data';
import { createWrapperComponent, waitFor } from '../../../utils';
import { useReturnReason, useReturnReasons } from '../../../../src/';

describe('useReturnReasons hook', () => {
  test('returns a list of return reasons', async () => {
    const return_reasons = fixtures.list('return_reason');

    const { vm } = createWrapperComponent(() => useReturnReasons());

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.return_reasons).toEqual(return_reasons);
  });
});

describe('useReturnReason hook', () => {
  test('returns a return reason', async () => {
    const return_reason = fixtures.get('return_reason');

    const { vm } = createWrapperComponent(() =>
      useReturnReason(return_reason.id)
    );

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.return_reason).toEqual(return_reason);
  });
});
