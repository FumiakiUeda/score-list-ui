"use client";

import { useAuth } from "@/hooks/auth";
import { Header } from "@/app/(app)/Header";
import { List } from "@/app/(app)/List";
import { Heading } from "@/components/Heading";
import { SearchForm } from "@/components/SearchForm";

export default function Home() {
  const { user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  return (
    <>
      <Header user={user} />
      <main className="flex flex-col justify-between px-4 py-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <>
          <Heading sectionName={"譜面一覧"} />
          <SearchForm />
          <div className="w-full">
            <List user={user} />
          </div>
        </>
      </main>
    </>
  );
}
