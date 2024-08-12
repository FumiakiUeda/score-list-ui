"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useScoreEdit } from "@/hooks/backend";
import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { Loading } from "@/components/Loading";
import { CreateForm } from "@/components/CreateForm";

export default function Home() {
  const params = useParams();
  const [score, setScore] = useState(null);

  useEffect(() => {
    useScoreEdit(params.id, setScore);
  }, [params.id]);

  return (
    <>
      <Header />
      <main className="flex flex-col justify-between px-6 py-6 mx-auto max-w-4xl lg:px-8">
        <Heading sectionName={"譜面を編集"} />
        <div className="w-full">
          {score ? <CreateForm {...score} /> : <Loading />}
        </div>
      </main>
    </>
  );
}
