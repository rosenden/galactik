import { addons } from '@storybook/manager-api';
import { GLOBALS_UPDATED } from '@storybook/core-events';
import galactikReactLightTheme, { galactikReactDarkTheme } from './theme';

const applyTheme = (mode?: string) => {
  addons.setConfig({
    theme: mode === 'dark' ? galactikReactDarkTheme : galactikReactLightTheme,
    sidebar: { 
      showRoots: true,
      collapsedRoots: []
    },
    initialActive: 'sidebar'
  });
};

addons.register('galactik/theme-switcher', (api) => {
  applyTheme(api.getGlobals()?.theme);

  api.on(GLOBALS_UPDATED, ({ globals }) => {
    applyTheme(globals?.theme);
  });

  // Set default story to Home
  const interval = setInterval(() => {
    if (api.selectStory) {
      api.selectStory('home--default');
      clearInterval(interval);
    }
  }, 100);
});
