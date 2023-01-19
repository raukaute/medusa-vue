# Medusa Vue

Vue 3 composables and components for seamless and streamlined interaction with a [Medusa](https://github.com/medusajs/medusa).

If you're building a custom vue based storefront that consumes a medusa backend and find yourself wishing you had something nice at hands like `medusa-react` to streamline your data management - this might be your library!

## Installation

The library uses [@tanstack/vue-query](https://tanstack.com/query/v4/docs/vue/overview) under the hood.

For the core composables run:

```bash
npm install @medusa-vue/core
# or
yarn add @medusa-vue/core
```

For the components (WIP :construction_worker:):

```bash
npm install @medusa-vue/components
# or
yarn add @medusa-vue/components
```

## Quick Start

In order to use the composables exposed by this library you need to register it as a plugin in your main file before mounting your app. The plugin takes a config object that needs at least a `baseUrl` where it can reach your server. Optionally, it allows you to pass additional props to configure both the underlying `medusa-js` and the `vue-query` client. Here's the complete interface. Refer to [these](https://docs.medusajs.com/js-client/overview/) and [these](https://tanstack.com/query/v4/docs/vue/overview) docs, respectively to get an idea on how the parts work together.

```ts
interface MedusaVueClientProps {
  baseUrl: string;
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

  queryClientProviderProps?: VueQueryPluginOptions;
}
```

Plug it in:

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

import { createMedusaVueClient } from '@medusa-vue/core';

const client = createMedusaVueClient({
  baseUrl: '<YOUR_SERVER_BASE_URL>',
});

const app = createApp(App);

app.use(client).mount('#app');
```

### Queries

[Queries](https://tanstack.com/query/v4/docs/vue/guides/queries) simply wrap around vue-query's `useQuery` hook to fetch some data from your medusa server

```vue
// ./my-product-list.vue
<script setup lang="ts">
import { watch } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { useProducts } from '@medusa-vue/core';

const { data, error, isLoading } = useProducts();
</script>

<template>
  <ul v-for="products in data?.products">
    <li>...</li>
  </ul>
</template>
```

**_Note_**: If you've worked with @medusajs/medusa-react you might be used to being able to destructure the recordset returned by the server directly, i.e. `const { products } = useProducts()`. This is however not possible with vue due to the way it's reactive system works.

### Mutations

[Mutations](https://react-query.tanstack.com/guides/mutations#_top) wrap around vue-query's `useMutation` to mutate data and perform server-side effects on your medusa server. If you are not entirely familiar with this idea of "mutations", creating a cart would be a mutation because it creates a cart in your server (and database). Mutations also have to be invoked imperatively, meaning that calling for the mutation to take action, you will have to call a `mutate()` function returned from mutation hooks.

```vue
<script setup lang="ts">
import { useCreateCart } from '@medusa-vue/core';

const createCart = useCreateCart();
const handleClick = () => {
  createCart.mutate({}); // create an empty cart
};
</script>

<template>
  <Button isLoading="{createCart.isLoading}" onClick="{handleClick}">
    Create cart
  </Button>
</template>
```

The mutation hooks will return exactly what vue-query's [`useMutation`](https://tanstack.com/query/v4/docs/vue/guides/mutations) returns. In addition, the options you pass in to the hooks will be passed along to `useMutation`.

### Components

**_NOTE_**: This is still work in progress and new components will gradually be added!:construction_worker:

If you prefer declarative templates, `@medusa-vue/components` provided (almost) renderless components to use directly in your template and provide data through `slot-props`. This allows for extremely streamlinend and declarative templating:

```vue
<script setup lang="ts">
import { UseProducts } from '@medusa-vue/components';
</script>

<template>
  <use-products v-slot="{ data, isLoading }">
    <loading-spinner v-if="isLoading" />

    <product-list :products="data.products" />
  </use-products>
</template>
```

The component also allows to pass down the laoding indicating component via a slot:

```vue
<script setup lang="ts">
import { UseProducts } from '@medusa-vue/components';
</script>

<template>
  <use-products>
    <template #fallback>
      <div>Loading....</div>
    </template>

    <template v-slot="{ data, isLoading }">
      <product-list :products="data.products" />
    </template>
  </use-products>
</template>
```

### Utilities

A set of utility functions are also exposed from the library to make your life easier when dealing with displaying money amounts

#### `formatVariantPrice()`

- `formatVariantPrice(params: FormatVariantPriceParams): string`

```typescript
type FormatVariantPriceParams = {
  variant: ProductVariantInfo;
  region: RegionInfo;
  includeTaxes?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};

type ProductVariantInfo = Pick<ProductVariant, 'prices'>;

type RegionInfo = {
  currency_code: string;
  tax_code: string;
  tax_rate: number;
};
```

Given a variant and region, will return a string representing the localized amount (i.e: `$19.50`)

The behavior of minimumFractionDigits and maximumFractionDigits is the same as the one explained by MDN [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat). In fact, in order to convert the decimal amount, we use the browser's `Intl.NumberFormat` method.

#### `computeVariantPrice()`

- `computeVariantPrice(params: ComputeVariantPriceParams): number`

```typescript
type ComputeVariantPriceParams = {
  variant: ProductVariantInfo;
  region: RegionInfo;
  includeTaxes?: boolean;
};
```

Determines a variant's price based on the region provided. Returns a decimal number representing the amount.

#### `formatAmount()`

- `formatAmount(params: FormatAmountParams): string`

```typescript
type FormatAmountParams = {
  amount: number;
  region: RegionInfo;
  includeTaxes?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};
```

Returns a localized string based on the input params representing the amount (i.e: "$10.99").

#### `computeAmount()`

- `computeAmount(params: ComputeAmountParams): number`

```typescript
type ComputeAmountParams = {
  amount: number;
  region: RegionInfo;
  includeTaxes?: boolean;
};
```

Takes an integer amount, a region, and includeTaxes boolean. Returns a decimal amount including (or excluding) taxes.

### Credits

Based on and inspired by [medusa-react](https://www.npmjs.com/package/medusa-react).
Keep up the good work! :beers:
