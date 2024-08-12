"use client";

import { FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useScoreEdit, useScoreStore } from "@/hooks/backend";
import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { Loading } from "@/components/Loading";
import { CreateForm } from "@/components/CreateForm";

export default function Home() {
  const params = useParams();
  const router = useRouter();
  const [score, setScore] = useState(null);

  useEffect(() => {
    useScoreEdit(params.id, setScore);
  }, [params.id]);
  
  // クリックでフォーム内容を送信
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("user_id", "1");
    useScoreStore(params.id, formData, router);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col justify-between px-6 py-6 mx-auto max-w-4xl lg:px-8">
        <Heading sectionName={"譜面を編集"} />
        <div className="w-full">
          {score ? <CreateForm {...score} submitFunc={submitHandler} /> : <Loading />}
        </div>
      </main>
    </>
  );
}
