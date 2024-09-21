"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import { LINK_DATA } from "@/constants/linkdata";
import { APP_DATA } from "@/constants/appdata";

export default function Home() {
  const { user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: LINK_DATA.HOME_LINK,
  });
  return (
    <>
      <main className="flex flex-col justify-between px-4 py-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="my-10 text-center">
          <div className="inline-block pb-4">
            <Image
              src="/icon.png"
              width={54}
              height={54}
              alt="アプリアイコン"
            />
          </div>
          <h1 className="text-2xl font-bold mb-10">{APP_DATA.APP_NAME}</h1>
          <p className="text-gray-400">{APP_DATA.APP_DESCRIPTION}</p>
          <div className="my-12">
            <Link
              href={LINK_DATA.LOGIN_LINK}
              className="rounded-md bg-lime-700 block w-full sm:w-96 mx-auto px-3 py-2 font-semibold text-white shadow-sm hover:bg-lime-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            >
              ログイン
            </Link>
            <p className="py-5 text-gray-400 text-sm">または</p>
            <Link
              href={LINK_DATA.REGISTER_LINK}
              className="rounded-md bg-lime-700 block w-full sm:w-96 mx-auto px-3 py-2 font-semibold text-white shadow-sm hover:bg-lime-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            >
              新規登録
            </Link>
          </div>
          <p className="text-sm text-gray-400">Produced by Fumiaki Ueda</p>
        </div>
      </main>
    </>
  );
}
