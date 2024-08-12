"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useScoreCreate } from "@/hooks/backend";
import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { CreateForm } from "@/components/CreateForm";

export default function Home() {
  const router = useRouter();

  // クリックでフォーム内容を送信
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("user_id", "1");
    useScoreCreate(formData, router);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col justify-between px-6 py-6 mx-auto max-w-4xl lg:px-8">
        <Heading sectionName={"譜面を追加"} />
        <div className="w-full">
          <CreateForm submitFunc={submitHandler} />
        </div>
      </main>
    </>
  );
}
