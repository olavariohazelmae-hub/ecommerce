import { NavItemWithOptionalChildren } from "@/types";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import Branding from "./Branding";
import { siteConfig } from "@/config/site";
import SocialMedias from "./SocialMedias";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {};

function MainFooter({ }: Props) {
  const footerSiteMap: NavItemWithOptionalChildren[] = [
    {
      title: "Shop",
      items: [
        {
          title: "Notebooks",
          href: "/collections/notebooks",
          items: [],
        },
        {
          title: "Pens & Pencils",
          href: "/collections/pens-pencils",
          items: [],
        },
        {
          title: "Paper Goods",
          href: "/collections/paper-goods",
          items: [],
        },
        {
          title: "Accessories",
          href: "/collections/accessories",
          items: [],
        },
        {
          title: "Sale",
          disabled: true,
          items: [],
        },
      ],
    },
    {
      title: "Customer Service",
      items: [
        {
          title: "Shipping & Returns",
          disabled: true,
          items: [],
        },
        {
          title: "Store Policy",
          disabled: true,
          items: [],
        },
        {
          title: "Payment Methods",
          disabled: true,
          items: [],
        },
        {
          title: "FAQ",
          disabled: true,
          items: [],
        },
      ],
    },
    {
      title: "About Aesthesionery",
      items: [
        {
          title: "Our Story",
          href: "https://github.com/clonglam/HIYORI-master",
          items: [],
        },
        {
          title: "Brands & Designers",
          disabled: true,
          items: [],
        },
        {
          title: "Stores",
          disabled: true,
          items: [],
        },
        {
          title: "Contact",
          disabled: true,
          items: [],
        },
      ],
    },
  ];

  return (
    <footer className="bg-secondary mt-[80px] md:mt-0 border-t border-border">
      <div className="container pb-10 pt-4 md:pt-8">
        <div className="grid grid-cols-1 md:grid-cols-5 mb-[40px] md:mb-[80px] gap-x-[100px] place-content-between space-y-9">
          <div className="max-w-md col-span-1 md:col-span-5 lg:col-span-2">
            <NewsletterForm />
          </div>

          {/* Desktop Footer Links */}
          <div className="hidden md:grid grid-cols-3 col-span-5 lg:col-span-3 gap-x-6 max-w-[680px]">
            {footerSiteMap.map(({ title, items }, index) => (
              <div key={index}>
                <p className="font-semibold mb-3">{title}</p>
                <div className="flex flex-col gap-y-2 flex-wrap">
                  {items?.map((i, index) => (
                    <Link href={i.href || ""} key={index} className="text-sm hover:underline">
                      {i.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Footer Links (Accordion) */}
          <div className="md:hidden col-span-1 w-full">
            <Accordion type="single" collapsible className="w-full">
              {footerSiteMap.map(({ title, items }, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-base font-semibold">{title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-y-3 pl-2">
                      {items?.map((i, idx) => (
                        <Link href={i.href || ""} key={idx} className="text-sm text-muted-foreground">
                          {i.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="flex gap-x-5 justify-between flex-col md:flex-row md:items-center items-start ">
          <div className="flex flex-col md:flex-row gap-x-5 md:items-center items-start mb-4 md:mb-0">
            <Branding className="text-3xl" />
            <div className="text-[10px] font-light">
              <p>{siteConfig.address}</p>
              <p>
                {siteConfig.phone} /{" "}
                <Link
                  className="hover:underline hover:text-primary"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </Link>
              </p>
            </div>
          </div>

          <SocialMedias containerClassName="mr-12" />
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;
