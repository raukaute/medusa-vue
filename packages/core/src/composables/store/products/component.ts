import { useProducts } from './queries';
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

export interface MedusaVueComponentProps {
  as?: string;
}

export interface UseMedusaProductsComponentProps
  extends MedusaVueComponentProps {}

export const UseMedusaProductsImplementation = /*#__PURE__*/ defineComponent({
  name: 'UseMedusaProducts',
  props: {
    as: {
      type: String,
      required: false,
    },
  },

  setup(props, { slots }) {
    const data = useProducts();

    return () => {
      const slotProps = reactive(data);
      const children = slots.default && slots.default(slotProps);
      const fallback = slots.fallback && slots.fallback();
      const component = props.as ? h(props.as, {}, children) : children;

      return (data.isLoading.value && fallback) || component;
    };
  },
});

export const UseProducts: _UseMedusaProductsI =
  UseMedusaProductsImplementation as any;

export interface _UseMedusaProductsI {
  new (): {
    $props: AllowedComponentProps &
      ComponentCustomProps &
      VNodeProps &
      UseMedusaProductsComponentProps;

    $slots: {
      default?: (data: UnwrapRef<ReturnType<typeof useProducts>>) => VNode[];
      fallback?: () => VNode[];
    };
  };
}
