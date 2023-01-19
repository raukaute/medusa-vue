import { inject } from 'vue';
import { medusaKey } from './injectionSymbols';
import Medusa from '@medusajs/medusa-js';

/**
 * Returns the medusa Client.
 */
export function useMedusa(): { client: Medusa } {
  return inject(medusaKey)!;
}
