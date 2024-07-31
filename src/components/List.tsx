'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { Pagenation } from "@/components/Pagenation";
import { useScoreDestroy, useScoreList } from "@/hooks/backend";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loading } from "@/components/Loading";
import { PART_NAME, PUBLISHERS } from "@/constants/scoredata";
import { LINK_DATA } from "@/constants/linkdata";
import Link from "next/link"

interface Score {
  id: number;
  name: string;
  composer: string;
  arranger: string;
  publisher: number;
  note: string;
  part: { part_id: number }[];
}

const parts = PART_NAME;
const publishers = PUBLISHERS;

export function List() {
  const router = useRouter();
  const [scores, setScores] = useState(null);
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page");
  console.log(pageNum);

  // スコアリストを取得してscoresを更新
  useEffect(() => {
    useScoreList(setScores, router)
  }, [router])

  // クリックした譜面を削除
  const handleDelete = useCallback(async (id: number) => {
    await useScoreDestroy(id, router)
    useScoreList(setScores)
  }, [])

  const scoreLength = scores ? scores.total : 0;

  if (!scores) {
    return  <Loading />;
  }
  return (

    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b border-neautral-200 dark:border-neutral-700 text-left text-neutral-500 dark:text-neutral-400">
            <th scope="col" className="px-3 py-3">曲名</th>
            <th scope="col" className="px-3 py-3">作曲者</th>
            <th scope="col" className="px-3 py-3">編曲者</th>
            <th scope="col" className="px-3 py-3">出版社</th>
            <th scope="col" className="px-3 py-3">備考</th>
            <th scope="col" className="px-3 py-3">不足パート譜</th>
          </tr>
        </thead>
        <tbody>
          {scores && scores.data.map((score: Score) => (
            <tr className="border-b border-neautral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800" key={score.id}>
              <td className="px-3 py-3"><div>
                {score.name}
              </div>
                <div className="mt-2">
                  <Link
                    href={LINK_DATA.EDIT_LINK + score.id}
                    className="px-1.5 py-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                  <a
                    href="#"
                    className="px-1.5 py-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                    onClick={() => {
                      handleDelete(score.id)
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </a>
                </div>
              </td>
              <td className="px-3 py-3">{score.composer}</td>
              <td className="px-3 py-3">{score.arranger}</td>
              <td className="px-3 py-3">{publishers[score.publisher]}</td>
              <td className="px-3 py-3">{score.note}</td>
              <td className="px-3 py-3">{score.part.map((val) => { return parts[val.part_id] }).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table >
      <Pagenation total={scoreLength} data={scores} />
    </div>
  )
}