type Link = {
  displayName: string;
  href?: string;
};

export type Navigation = Link & {
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  external?: boolean;
};

export type NavigationItem = Navigation & {
  type?: 'group';
  items?: NavigationItem[];
};

export type NavigationDict = Record<string, NavigationItem>;

export type SocialMediaPlatform = 'github' | 'website';

export type SocialMediaDict = {
  [key in SocialMediaPlatform]?: Link;
};
