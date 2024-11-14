// Define types for the "site" object
export type Site = {
  title: string;
  description: string;
  url: string | URL;
  language: string;
  country: string;
  favicon: string;
  tagline: string;
};


// Define types for the "metadata" object
export type Metadata = {
  ogTitle: string;
  ogDescription: string;
  ogImage: {
    url: string | URL;
    alt: string;
    width: number;
    height: number;
  }
  ogType: string;
  twitter: {
    handle: string;
    site: string;
    cardType: string;
  }
  robots: {
    index: boolean;
    follow: boolean;
  }
};

// Define types for the "home" object
export type Home = {
  blogPageSize: number;
};

// Define types for the "logo" object
export type Logo = {
  image: string;
  imageDarkMode: string;
  height: number;
  width: number;
};

// Define types for the "blog" object
export type Blog = {
  title: string;
  description: string;
  pageSize: number;
  excerptWordLength: number;
};



export type Footer = {
  description: string;
  copyrightMessage: string;
  copyrightYear: boolean;
};
