import { useCollection, useCollections } from '@medusa-vue/core';
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

export interface MedusaVueComponentProps extends TagProps {}

export interface UseMedusaUseCollectionsComponentProps
  extends MedusaVueComponentProps {}

export const UseMedusaGetCollectionsImplementation =
  /*#__PURE__*/ defineComponent({
    name: 'UseMedusaGetCollections',
    props: {
      id: {
        type: String,
        required: true,
      },
      ...makeTagProps(),
    },

    setup(props, { slots }) {
      const data = useCollections();

      return () => {
        const slotProps = reactive(data);
        const children = slots.default && slots.default(slotProps);
        const fallback = slots.fallback && slots.fallback();
        const component = props.tag ? h(props.tag, {}, children) : children;

        return (data.isLoading.value && fallback) || component;
      };
    },
  });

export const UseGetCollections: _UseMedusaGetCollectionsI =
  UseMedusaGetCollectionsImplementation as any;

export interface _UseMedusaGetCollectionsI {
  new (): {
    $props: AllowedComponentProps &
      ComponentCustomProps &
      VNodeProps &
      UseMedusaUseCollectionsComponentProps;

    $slots: {
      default?: (data: UnwrapRef<ReturnType<typeof useCollections>>) => VNode[];
      fallback?: () => VNode[];
    };
  };
}
