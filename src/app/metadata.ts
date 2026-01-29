import type { Metadata } from "next";
import { SITE_INFO, SITE_URL } from "@/constants/site";

// 获取 basePath，用于静态资源路径
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const baseMetaData: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_INFO.title,
  description: SITE_INFO.description,
  openGraph: {
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    url: SITE_URL,
    siteName: SITE_INFO.title,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: SITE_INFO.openGraphImage,
        width: 1200,
        height: 630,
        alt: "速剪",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    creator: "@flashcutapp",
    images: [SITE_INFO.twitterImage],
  },
  pinterest: {
    richPin: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: `${basePath}/logo.svg` },
    ],
    apple: [
      { url: `${basePath}/logo.svg` },
    ],
    shortcut: [`${basePath}/logo.svg`],
  },
  appleWebApp: {
    capable: true,
    title: SITE_INFO.title,
  },
  manifest: `${basePath}/manifest.json`,
};
