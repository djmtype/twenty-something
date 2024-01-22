export type ChildItem = {
  name: string;
  url: string;
  rel?: string;
  target?: string;
};

export type NavigationItem = {
  name: string;
  url: string;
  rel?: string;
  target?: string;
  children?: boolean;
  childItems?: ChildItem[] | null;
};



