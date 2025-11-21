import { create } from '@storybook/theming';

const palette = {
  sage50: '#f5f8f7',
  sage100: '#e8f0ee',
  sage200: '#d1e1dd',
  sage300: '#a9c1b8',
  sage400: '#7a9b95',
  sage500: '#607c7f',
  sage600: '#5d7374',
  sage700: '#4f6162',
  sage800: '#445556',
  sage900: '#374648',
  sage950: '#2d393a',
  sage975: '#222d30',
  almond50: '#f1f8f4',
  almond400: '#5fa884',
  almond500: '#3d8c69',
  grey100: '#f9fafb',
  grey200: '#eff2f6',
  grey400: '#97a6be',
  grey700: '#4d5260',
  grey900: '#272b30',
  white: '#ffffff',
  black: '#182021'
};

const brandMeta = {
  brandTitle: 'Galactik VUE UI',
  brandUrl: '/?path=/story/home--default',
  brandTarget: '_self'
};

export const galactikVueLightTheme = create({
  base: 'light',
  ...brandMeta,
  colorPrimary: palette.sage600,
  colorSecondary: palette.sage600,
  appBg: palette.almond50,
  appContentBg: palette.white,
  appBorderColor: palette.grey200,
  appPreviewBg: palette.white,
  textColor: palette.grey900,
  textInverseColor: palette.white,
  textMutedColor: palette.grey400,
  barTextColor: palette.sage900,
  barSelectedColor: palette.sage600,
  barBg: palette.almond50,
  inputBg: palette.white,
  inputBorder: palette.grey200,
  inputTextColor: palette.grey900,
  inputBorderRadius: 12
});

export const galactikVueDarkTheme = create({
  base: 'dark',
  ...brandMeta,
  colorPrimary: palette.almond400,
  colorSecondary: palette.almond500,
  appBg: palette.sage975,
  appContentBg: palette.black,
  appBorderColor: palette.sage800,
  appPreviewBg: palette.black,
  textColor: palette.white,
  textInverseColor: palette.black,
  textMutedColor: palette.grey400,
  barTextColor: palette.white,
  barSelectedColor: palette.sage600,
  barBg: palette.sage975,
  inputBg: palette.black,
  inputBorder: palette.sage800,
  inputTextColor: palette.white,
  inputBorderRadius: 12
});

export default galactikVueLightTheme;
