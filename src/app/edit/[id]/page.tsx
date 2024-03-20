'use client'

import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { CreateForm } from "@/components/CreateForm";
import { useScoreEdit } from "@/hooks/backend";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const params = useParams();
  const [score, setScore] = useState(null);

  useEffect(() => {
    useScoreEdit(params.id, setScore)
  }, [params.id])

  return (
    <>
      <Header />
      <main className="flex flex-col justify-between px-6 py-6 mx-auto max-w-4xl lg:px-8">
        <Heading sectionName={'譜面を編集'} />
        <div className="w-full">
          <CreateForm {...score} />
        </div>
      </main>
    </>
  );
}
