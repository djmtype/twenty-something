type ColophonItem = {
  name: string;
  url: string;
  rel?: string;
  target?: string;
};

export type ColophonData = {
  heading: string;
  content: ColophonItem[];
};
