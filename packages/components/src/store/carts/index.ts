import { useGetCart } from '@medusa-vue/core';
import {
  AllowedComponentProps,
  ComponentCustomProps,
  UnwrapRef,
  VNode,
  VNodeProps,
  defineComponent,
  h,
  reactive,
} from 'vue';

import { makeTagProps } from '../../util/makeProps';
import type { TagProps } from '../../util/makeProps';

export interface UseMedusaGetCartComponentProps extends TagProps {}

export const UseMedusaGetCartImplementation = /*#__PURE__*/ defineComponent({
  name: 'UseMedusaGetCart',
  props: {
    id: {
      type: String,
      required: true,
    },
    ...makeTagProps(),
  },

  setup(props, { slots }) {
    const data = useGetCart(props.id);

    return () => {
      const slotProps = reactive(data);
      const children = slots.default && slots.default(slotProps);
      const fallback = slots.fallback && slots.fallback();
      const component = props.tag ? h(props.tag, {}, children) : children;

      return (data.isLoading.value && fallback) || component;
    };
  },
});

export const UseGetCart: _UseMedusaGetCartI =
  UseMedusaGetCartImplementation as any;

export interface _UseMedusaGetCartI {
  new (): {
    $props: AllowedComponentProps &
      ComponentCustomProps &
      VNodeProps &
      UseMedusaGetCartComponentProps;

    $slots: {
      default?: (data: UnwrapRef<ReturnType<typeof useGetCart>>) => VNode[];
      fallback?: () => VNode[];
    };
  };
}
