import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { ToastContainer, Bounce } from "react-toastify";
import { config } from "@fortawesome/fontawesome-svg-core";
import { APP_DATA } from "@/constants/appdata";

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
      <body className={notojp.className + " text-white bg-neutral-900"}>
        {children}
        {/* トースト表示 */}
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
