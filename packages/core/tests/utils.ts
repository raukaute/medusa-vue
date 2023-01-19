import { mount } from '@vue/test-utils';
import { defineComponent, watch } from 'vue';
import { createMedusaVueClient } from '../src';

const createTestMedusaVueClient = () => {
  const client = createMedusaVueClient({
    baseUrl: '/',
    queryClientProviderProps: {},
  });

  return client;
};

export const createWrapperComponent = <T>(dataFn: () => T) => {
  const client = createTestMedusaVueClient();

  const wrapper = mount(
    defineComponent({
      setup() {
        const data = dataFn();

        return data;
      },

      template: '<div />',
    }),
    {
      global: {
        plugins: [client],
      },
    }
  );

  return wrapper;
};

export const waitFor = (condition: () => any) => {
  let manuallyResolve: (val?: unknown) => void;
  const promise = new Promise(resolve => (manuallyResolve = resolve));

  watch(
    () => condition(),
    () => {
      if (condition()) {
        manuallyResolve();
      }
    }
  );

  return promise;
};
