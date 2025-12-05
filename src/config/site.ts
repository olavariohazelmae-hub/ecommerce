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
      title: "Journal",
      href: "/journal",
      description: "Stories about sustainability, creativity, and slow living.",
      items: [],
    },
  ] satisfies NavItemWithOptionalChildren[],
};
