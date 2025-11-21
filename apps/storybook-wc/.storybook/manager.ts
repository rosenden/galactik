import { addons } from '@storybook/manager-api';
import galactikWcLightTheme, { galactikWcDarkTheme } from './theme';

const applyTheme = (mode?: string) => {
  addons.setConfig({
    theme: mode === 'dark' ? galactikWcDarkTheme : galactikWcLightTheme,
    sidebar: { 
      showRoots: true,
      collapsedRoots: []
    },
    initialActive: 'sidebar'
  });
};

addons.register('galactik/theme-switcher', (api) => {
  // Apply initial theme
  applyTheme(api.getGlobals()?.theme);

  // Listen to all globals changes
  const channel = api.getChannel();
  if (channel) {
    // Listen to multiple events to catch theme changes
    channel.on('updateGlobals', ({ globals }: any) => {
      applyTheme(globals?.theme);
    });
    channel.on('STORY_CHANGED', () => {
      applyTheme(api.getGlobals()?.theme);
    });
  }

  // Set default story to Home
  const interval = setInterval(() => {
    if (api.selectStory) {
      api.selectStory('home--default');
      clearInterval(interval);
    }
  }, 100);
});
