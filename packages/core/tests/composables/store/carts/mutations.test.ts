import { fixtures } from '../../../../mocks/data';
import {
  useAddShippingMethodToCart,
  useCompleteCart,
  useCreateCart,
  useCreatePaymentSession,
  useDeletePaymentSession,
  useRefreshPaymentSession,
  useSetPaymentSession,
  useUpdateCart,
  useUpdatePaymentSession,
} from '../../../../src';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useCreateCart hook', () => {
  test('creates a cart', async () => {
    const { vm } = createWrapperComponent(() => useCreateCart());

    vm.mutate({});

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.cart).toEqual(fixtures.get('cart'));
  });
});

describe('useUpdateCart hook', () => {
  test('updates a cart', async () => {
    const { vm } = createWrapperComponent(() => useUpdateCart('some-cart'));

    vm.mutate({
      email: 'new@email.com',
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.cart).toEqual({
      ...fixtures.get('cart'),
      id: 'some-cart',
      email: 'new@email.com',
    });
  });
});

describe('useCompleteCart hook', () => {
  test('completes a cart', async () => {
    const { vm } = createWrapperComponent(() => useCompleteCart('test-cart'));

    vm.mutate();

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.type).toEqual('order');
    expect(vm.data?.data).toEqual(fixtures.get('order'));
  });
});

describe('useCreatePaymentSession hook', () => {
  test('creates a payment session', async () => {
    const { vm } = createWrapperComponent(() =>
      useCreatePaymentSession('test-cart')
    );

    vm.mutate();

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.cart).toEqual({
      ...fixtures.get('cart'),
      id: 'test-cart',
    });
  });
});

describe('useUpdatePaymentSession hook', () => {
  test('updates a payment session', async () => {
    const { vm } = createWrapperComponent(() =>
      useUpdatePaymentSession('test-cart')
    );

    vm.mutate({
      data: {},
      provider_id: 'stripe',
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.cart).toEqual({
      ...fixtures.get('cart'),
      id: 'test-cart',
    });
  });
});

describe('useRefreshPaymentSession hook', () => {
  test('refreshes a payment session', async () => {
    const { vm } = createWrapperComponent(() =>
      useRefreshPaymentSession('test-cart')
    );

    vm.mutate({
      provider_id: 'stripe',
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.cart).toEqual({
      ...fixtures.get('cart'),
      id: 'test-cart',
    });
  });
});

describe('useSetPaymentSession hook', () => {
  test('sets a payment session', async () => {
    const { vm } = createWrapperComponent(() =>
      useSetPaymentSession('test-cart')
    );

    vm.mutate({
      provider_id: 'stripe',
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.cart).toEqual({
      ...fixtures.get('cart'),
      id: 'test-cart',
    });
  });
});

describe('useDeletePaymentSession hook', () => {
  test('deletes a payment session', async () => {
    const { vm } = createWrapperComponent(() =>
      useDeletePaymentSession('test-cart')
    );

    vm.mutate({
      provider_id: 'stripe',
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.cart).toEqual({
      ...fixtures.get('cart'),
      id: 'test-cart',
    });
  });
});

describe('useAddShippingMethodToCart hook', () => {
  test('adds a shipping method to a cart', async () => {
    const { vm } = createWrapperComponent(() =>
      useAddShippingMethodToCart('test-cart')
    );

    vm.mutate({
      option_id: 'test-option',
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.cart).toEqual({
      ...fixtures.get('cart'),
      id: 'test-cart',
    });
  });
});
