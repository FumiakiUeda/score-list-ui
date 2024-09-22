"use client";

import { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import { fetchScoreEdit, sendScoreStore } from "@/hooks/backend";
import { Header } from "@/app/(app)/Header";
import { Heading } from "@/components/Heading";
import { Loading } from "@/components/Loading";
import { CreateForm } from "@/components/CreateForm";

interface Score {
  id: number;
  name: string;
  composer: string;
  arranger: string;
  publisher: number;
  note: string;
  part: { part_id: number }[];
  created_at: string;
  updated_at: string;
  user_id: number;
}

export default function Home() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [score, setScore] = useState<Score | null>(null);
  // ページ番号をクエリから取得
  const searchParams = useSearchParams();
  const pageNum = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const editScore = async () => {
      try {
        await fetchScoreEdit(params.id, setScore);
      } catch (error) {
        console.error("Failed to fetch edit score:", error);
      }
    };
    editScore();
  }, [params.id]);

  // クリックでフォーム内容を送信
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("user_id", "1");
    sendScoreStore(params.id, formData, router, pageNum);
  };

  return (
    <>
      <Header user={user} />
      <main className="flex flex-col justify-between px-6 py-6 mx-auto max-w-4xl lg:px-8">
        <Heading sectionName={"譜面を編集"} />
        <div className="w-full">
          {score ? (
            <CreateForm {...score} submitFunc={submitHandler} />
          ) : (
            <Loading />
          )}
        </div>
      </main>
    </>
  );
}
