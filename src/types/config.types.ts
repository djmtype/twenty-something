// types.ts

// Define types for the "site" object
type Site = {
  title: string;
  description: string;
  url: string | URL;
  language: string;
  country: string;
  favicon: string;
  tagline: string;
};


// Define types for the "metadata" object
type Metadata = {
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
type Home = {
  blogPageSize: number;
};

// Define types for the "logo" object
type Logo = {
  image: string;
  imageDarkMode: string;
  height: number;
  width: number;
};

// Define types for the "blog" object
type Blog = {
  title: string;
  description: string;
  pageSize: number;
};



type Footer = {
  description: string;
  copyrightMessage: string;
  copyrightYear: boolean;
};

//  Define the overall type for the JSON object
export type ConfigObj = {
  site: Site;
  home: Home;
  logo: Logo;
  blog: Blog;
  metadata: Metadata;
  footer: Footer;
};

