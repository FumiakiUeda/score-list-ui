import Link from "next/link";
import AuthCard from "@/app/(auth)/AuthCard";
import Image from "next/image";

export const metadata = {
  title: "Laravel",
};

const Layout = ({ children }) => {
  return (
    <div>
      <div className="antialiased">
        <AuthCard
          logo={
            <Link href="/">
              <Image
                src="/icon.png"
                width={80}
                height={80}
                className="w-20 h-20 fill-current text-gray-500"
                alt="アプリアイコン"
              />
            </Link>
          }
        >
          {children}
        </AuthCard>
      </div>
    </div>
  );
};

export default Layout;
