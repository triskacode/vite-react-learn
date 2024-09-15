export interface Navigation {
  displayName: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  external?: boolean;
}

export interface NavigationItem extends Navigation {
  type?: 'group';
  items?: NavigationItem[];
}

export interface NavigationDict {
  [key: string]: NavigationItem;
}
