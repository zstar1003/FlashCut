export const SITE_URL = "https://flashcut.app";

export const SITE_INFO = {
  title: "速剪",
  description:
    "简单强大的在线视频编辑器，完全在浏览器中运行。",
  url: SITE_URL,
  openGraphImage: "/open-graph/default.jpg",
  twitterImage: "/open-graph/default.jpg",
  favicon: "/favicon.ico",
};

export const EXTERNAL_TOOLS = [
  {
    name: "Marble",
    description:
      "Modern headless CMS for content management and the blog for FlashCut",
    url: "https://marblecms.com?utm_source=flashcut",
    icon: "MarbleIcon" as const,
  },
  {
    name: "Vercel",
    description: "Platform where we deploy and host FlashCut",
    url: "https://vercel.com?utm_source=flashcut",
    icon: "VercelIcon" as const,
  },
  {
    name: "Databuddy",
    description: "GDPR compliant analytics and user insights for FlashCut",
    url: "https://databuddy.cc?utm_source=flashcut",
    icon: "DataBuddyIcon" as const,
  },
];
