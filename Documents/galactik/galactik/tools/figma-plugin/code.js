// Minimal plugin controller: shows the UI and relays simple messages if needed.
figma.showUI(__html__, { width: 420, height: 360 });

// Example: forward a message from UI to plugin (not used here but left for extension)
figma.ui.onmessage = (msg) => {
  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
