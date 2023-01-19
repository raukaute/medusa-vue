import { InjectionKey } from 'vue';
import Medusa from '@medusajs/medusa-js';

export const medusaKey = Symbol('medusa-client') as InjectionKey<{
  client: Medusa;
}>;
