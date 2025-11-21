import { defineComponent, h } from 'vue';

type IconProps = {
  size?: number;
  color?: string;
};

const iconProps = {
  size: { type: Number, default: 16 },
  color: { type: String, default: 'currentColor' }
};

export const ImageIcon = defineComponent({
  name: 'LabelImageIcon',
  props: iconProps,
  setup(props: IconProps) {
    return () =>
      h('svg', { width: props.size, height: props.size, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
        h('rect', { x: 2, y: 2, width: 12, height: 12, rx: 1, stroke: props.color, strokeWidth: 1.5, fill: 'none' }),
        h('circle', { cx: 6, cy: 6, r: 1.5, fill: props.color }),
        h('path', { d: 'M14 11L10.5 7.5L8 10L6 8L2 12V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V11Z', fill: props.color })
      ]);
  }
});

export const WarningIcon = defineComponent({
  name: 'LabelWarningIcon',
  props: iconProps,
  setup(props: IconProps) {
    return () =>
      h('svg', { width: props.size, height: props.size, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
        h('path', { d: 'M7.134 2.5a1 1 0 011.732 0l5.196 9a1 1 0 01-.866 1.5H2.804a1 1 0 01-.866-1.5l5.196-9z', stroke: props.color, strokeWidth: 1.5, fill: 'none' }),
        h('path', { d: 'M8 6v3', stroke: props.color, strokeWidth: 1.5, strokeLinecap: 'round' }),
        h('circle', { cx: 8, cy: 11, r: 0.5, fill: props.color })
      ]);
  }
});

export const ErrorIcon = defineComponent({
  name: 'LabelErrorIcon',
  props: iconProps,
  setup(props: IconProps) {
    return () =>
      h('svg', { width: props.size, height: props.size, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
        h('circle', { cx: 8, cy: 8, r: 6, stroke: props.color, strokeWidth: 1.5, fill: 'none' }),
        h('path', { d: 'M10 6L6 10', stroke: props.color, strokeWidth: 1.5, strokeLinecap: 'round' }),
        h('path', { d: 'M6 6l4 4', stroke: props.color, strokeWidth: 1.5, strokeLinecap: 'round' })
      ]);
  }
});

export const SuccessIcon = defineComponent({
  name: 'LabelSuccessIcon',
  props: iconProps,
  setup(props: IconProps) {
    return () =>
      h('svg', { width: props.size, height: props.size, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
        h('circle', { cx: 8, cy: 8, r: 6, stroke: props.color, strokeWidth: 1.5, fill: 'none' }),
        h('path', { d: 'M5.5 8l1.5 1.5L11 6', stroke: props.color, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })
      ]);
  }
});

export const InfoIcon = defineComponent({
  name: 'LabelInfoIcon',
  props: iconProps,
  setup(props: IconProps) {
    return () =>
      h('svg', { width: props.size, height: props.size, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
        h('circle', { cx: 8, cy: 8, r: 6, stroke: props.color, strokeWidth: 1.5, fill: 'none' }),
        h('path', { d: 'M8 7v4', stroke: props.color, strokeWidth: 1.5, strokeLinecap: 'round' }),
        h('circle', { cx: 8, cy: 5, r: 0.5, fill: props.color })
      ]);
  }
});
