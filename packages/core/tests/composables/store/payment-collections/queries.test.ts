import { fixtures } from '../../../../mocks/data';
import { createWrapperComponent, waitFor } from '../../../utils';
import { usePaymentCollection } from '../../../../src/';

describe('usePaymentCollection hook', () => {
  test('returns a payment collection', async () => {
    const payment_collection = fixtures.get('payment_collection');

    const { vm } = createWrapperComponent(() =>
      usePaymentCollection(payment_collection.id)
    );

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.payment_collection).toEqual(payment_collection);
  });
});
