import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { List } from "@/components/List";
import { Pagenation } from "@/components/Pagenation";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-between px-24 py-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Heading sectionName={'譜面一覧'} />
        <div className="w-full">
          <List />
          <Pagenation />
        </div>
      </main>
    </>
  );
}
