import {
  useManageMultiplePaymentSessions,
  useManagePaymentSession,
  useAuthorizePaymentSession,
  useAuthorizePaymentSessionsBatch,
  usePaymentCollectionRefreshPaymentSession,
} from '../../../../src';

import { createWrapperComponent, waitFor } from '../../../utils';

describe('useManageMultiplePaymentSessions hook', () => {
  test('Manage multiple payment sessions of a payment collection', async () => {
    const { vm } = createWrapperComponent(() =>
      useManageMultiplePaymentSessions('payment_collection_id')
    );

    vm.mutate({
      sessions: [
        {
          provider_id: 'manual',
          amount: 900,
        },
      ],
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.payment_collection).toEqual(
      expect.objectContaining({
        id: 'payment_collection_id',
        amount: 900,
      })
    );
  });
});

describe('useManagePaymentSession hook', () => {
  test('Manage payment session of a payment collection', async () => {
    const { vm } = createWrapperComponent(() =>
      useManagePaymentSession('payment_collection_id')
    );

    vm.mutate({
      provider_id: 'manual',
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.payment_collection).toEqual(
      expect.objectContaining({
        id: 'payment_collection_id',
        amount: 900,
      })
    );
  });
});

describe('useAuthorizePaymentSession hook', () => {
  test('Authorize a payment session of a Payment Collection', async () => {
    const { vm } = createWrapperComponent(() =>
      useAuthorizePaymentSession('payment_collection_id')
    );

    vm.mutate('123');

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);

    expect(vm.data?.payment_collection).toEqual(
      expect.objectContaining({
        id: '123',
        amount: 900,
      })
    );
  });
});

describe('authorizePaymentSessionsBatch hook', () => {
  test('Authorize all payment sessions of a Payment Collection', async () => {
    const { vm } = createWrapperComponent(() =>
      useAuthorizePaymentSessionsBatch('payment_collection_id')
    );

    vm.mutate({
      session_ids: ['abc'],
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(207);

    expect(vm.data?.payment_collection).toEqual(
      expect.objectContaining({
        id: 'payment_collection_id',
        payment_sessions: expect.arrayContaining([
          expect.objectContaining({
            amount: 900,
          }),
        ]),
      })
    );
  });
});

describe('usePaymentCollectionRefreshPaymentSession hook', () => {
  test('Refresh a payment sessions of a Payment Collection', async () => {
    const { vm } = createWrapperComponent(() =>
      usePaymentCollectionRefreshPaymentSession('payment_collection_id')
    );

    vm.mutate('session_id');

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.payment_session).toEqual(
      expect.objectContaining({
        id: 'new_session_id',
        amount: 900,
      })
    );
  });
});
