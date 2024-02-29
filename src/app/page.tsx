import { Header } from "@/components/Header";
import { List } from "@/components/List";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="w-full lg:flex">
          <List />
        </div>
      </main>
    </>
  );
}
