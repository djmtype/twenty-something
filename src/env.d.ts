/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'alpinejs';

interface Window {
    Alpine: import('alpinejs').Alpine;
  }

  declare module "smartypants" {
    const smartypants: any;
    export default smartypants;
  }