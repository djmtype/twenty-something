// types.ts

// Define types for the "site" object
type Site = {
    title: string;
    description: string;
    url: string;
    ogImage: string;
    language: string;
    country: string;
    favicon: string;
    tagline: string;
  }
  
  // Define types for the "settings" object
type Settings = {
    themeSwitcher: boolean;
  }
  
  // Define types for the "logo" object
  type Logo = {
    image: string;
    imageDarkMode: string;
    height: number;
    width: number;
  }
  
  // Define types for the "blog" object
  type Blog = {
    title: string;
    description: string;
  }
  
  // Define types for the "metadata" object
  type Metadata = {
    ogTitle: string;
    ogImage: string;
    ogImageAlt: string;
  }
  
//  Define the overall type for the JSON object
  export type ConfigObj = {
    site: Site;
    settings: Settings;
    logo: Logo;
    blog: Blog;
    metadata: Metadata;
  }
  