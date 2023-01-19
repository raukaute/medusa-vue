import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';
import Medusa from '@medusajs/medusa-js';
import { App } from 'vue';

import { medusaKey } from './injectionSymbols';

interface MedusaVueClientProps {
  baseUrl: string;
  queryClientProviderProps: VueQueryPluginOptions;
  maxRetries?: number;

  /**
   * Authentication token
   */
  apiKey?: string;
  /**
   * PublishableApiKey identifier that defines the scope of resources
   * available within the request
   */
  publishableApiKey?: string;
}

export const createMedusaVueClient = (options: MedusaVueClientProps) => {
  const medusaVueClient = {
    install: (app: App) => {
      const medusa = new Medusa({
        baseUrl: options.baseUrl,
        apiKey: options.apiKey,
        publishableApiKey: options.publishableApiKey,
        maxRetries: options.maxRetries || 1,
      });

      const vueQueryPluginOptions: VueQueryPluginOptions = {
        queryClientConfig: {
          defaultOptions: {
            queries: {
              cacheTime: 500,
              refetchOnWindowFocus: false,
              staleTime: 1000 * 60 * 60 * 24,
              retry: 1,
            },
          },
        },
      };

      app.provide(medusaKey, { client: medusa });

      app.use(VueQueryPlugin, vueQueryPluginOptions);
    },
  };

  return medusaVueClient;
};
