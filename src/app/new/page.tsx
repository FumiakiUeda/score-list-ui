import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { CreateForm } from "@/components/CreateForm";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-between px-6 py-6 mx-auto max-w-4xl lg:px-8">
        <Heading sectionName={'譜面を追加'} />
        <div className="w-full">
          <CreateForm />
        </div>
      </main>
    </>
  );
}
