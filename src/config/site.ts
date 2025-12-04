import type { NavItemWithOptionalChildren } from "@/types";

import { slugify } from "@/lib/utils";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Aesthesionery",
  description: "Ecommerce Application built with NextJS 14",
  url: "https://hiyori.hugo-coding.com",
  address: "Niagara Falls, Ontario, Canada",
  phone: "+1(234)-567-8901",
  email: "hazel@aesthesionary.com",
  mainNav: [
    {
      title: "Shop",
      href: "/shop",
      description: "All the products we have to offer.",
      items: [],
    },
    {
      title: "Our Story",
      href: "/our-story",
      description: "Learn about our commitment to sustainable stationery.",
      items: [],
    },
    {
      title: "Brands & Designers",
      href: "https://github.com/clonglam/HIYORI-master",
      description: "Read our latest blog posts.",
      items: [],
    },
    {
      title: "Blog",
      href: "https://blog.hugo-coding.com",
      description: "Read our latest blog posts.",
      items: [],
    },
    {
      title: "Contact",
      href: "https://hugo-coding.com/#contact",
      description: "Read our latest blog posts.",
      items: [],
    },
  ] satisfies NavItemWithOptionalChildren[],
};
