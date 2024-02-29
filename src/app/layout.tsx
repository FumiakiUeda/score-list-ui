import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "./globals.css";

const notojp = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "楽譜リスト作成ツール",
  description: "楽譜リスト作成ツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notojp.className}>{children}</body>
    </html>
  );
}
