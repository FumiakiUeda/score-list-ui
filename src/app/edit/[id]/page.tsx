'use client'

import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { CreateForm } from "@/components/CreateForm";
import { useEdit } from "@/hooks/backend";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import axios from '@/lib/axios';

export default function Home() {
  const params = useParams();
  const [score, setScore] = useState(null);

  const getScore = async () => {
    await axios
    .get('/api/score/' + params.id)
    .then(res => setScore(res.data))
  }
  useEffect(() => {
    getScore();
  }, [])

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
