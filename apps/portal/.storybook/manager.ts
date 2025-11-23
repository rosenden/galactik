import { addons } from '@storybook/manager-api';
import { GLOBALS_UPDATED } from '@storybook/core-events';
import galactikPortalLightTheme, { galactikPortalDarkTheme } from './theme';


const setFavicon = () => {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = './favicon.svg';
  document.head.appendChild(link);
};

const applyTheme = (mode?: string) => {
  addons.setConfig({
    theme: mode === 'dark' ? galactikPortalDarkTheme : galactikPortalLightTheme,
    sidebar: { showRoots: true }
  });
  setFavicon();
};

addons.register('galactik/theme-switcher', (api) => {
  applyTheme(api.getGlobals()?.theme);

  api.on(GLOBALS_UPDATED, ({ globals }) => {
    applyTheme(globals?.theme);
  });
});
