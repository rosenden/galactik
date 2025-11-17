import { addons } from '@storybook/manager-api';
import { GLOBALS_UPDATED } from '@storybook/core-events';
import galactikPortalLightTheme, { galactikPortalDarkTheme } from './theme';

const applyTheme = (mode?: string) => {
  addons.setConfig({
    theme: mode === 'dark' ? galactikPortalDarkTheme : galactikPortalLightTheme,
    sidebar: { showRoots: true }
  });
};

addons.register('galactik/theme-switcher', (api) => {
  applyTheme(api.getGlobals()?.theme);

  api.on(GLOBALS_UPDATED, ({ globals }) => {
    applyTheme(globals?.theme);
  });
});
