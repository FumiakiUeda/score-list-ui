import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import { APP_DATA } from "@/constants/appdata";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

const notojp = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

config.autoAddCss = false;

export const metadata: Metadata = {
  title: APP_DATA.APP_NAME,
  description: APP_DATA.APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={APP_DATA.LOCALE}>
      <body
        className={notojp.className + " dark:text-white dark:bg-neutral-900"}
      >
        {children}
      </body>
    </html>
  );
}
