import { NavigationDict } from './definition';

export const navigationDict: NavigationDict = {
  'getting-started': {
    displayName: 'Getting Started',
    type: 'group',
    items: [
      {
        displayName: 'Introduction',
        href: '/',
      },
    ],
  },
  components: {
    displayName: 'Components',
    type: 'group',
    items: [
      {
        displayName: 'Button',
        href: '/components/button',
      },
      {
        displayName: 'Command',
        href: '/components/command',
        disabled: true,
      },
      {
        displayName: 'Dialog',
        href: '/components/dialog',
        disabled: true,
      },
      {
        displayName: 'Drawer',
        href: '/components/drawer',
        disabled: true,
      },
      {
        displayName: 'Label',
        href: '/components/label',
        disabled: true,
      },
      {
        displayName: 'Radio Group',
        href: '/components/radio-group',
        disabled: true,
      },
      {
        displayName: 'Timeline',
        href: '/components/timeline',
      },
    ],
  },
};
