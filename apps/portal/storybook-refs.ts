import rawRefs from './storybook-refs.json';

export type StorybookRefDescriptor = {
  id: 'react' | 'vue' | 'angular' | 'wc' | 'portal';
  label: string;
  port: number;
  path: string;
  envVar: string;
  packageDir: string;
  workspace: string;
};

export const STORYBOOK_REFS = rawRefs as StorybookRefDescriptor[];
