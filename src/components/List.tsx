'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { Pagenation } from "@/components/Pagenation";
import { useScoreList } from "@/hooks/backend";
import { useEffect, useState } from "react";
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

export function List() {
  const [scores, setScores] = useState(null);

  // スコアリストを取得してscoresを更新
  useEffect(() => {
    useScoreList(setScores)
  }, [])

  const scoreLength = scores ? scores.length : 0;

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
          {scores && scores.map((score: Score) => (
            <tr className="border-b border-neautral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800" key={score.id}>
              <td className="px-3 py-3"><div>
                {score.name}
              </div>
                <div className="mt-2">
                  <Link
                    href={'/edit/' + score.id}
                    className="px-1.5 py-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                  <a href="#" className="px-1.5 py-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </a>
                </div>
              </td>
              <td className="px-3 py-3">{score.composer}</td>
              <td className="px-3 py-3">{score.arranger}</td>
              <td className="px-3 py-3">{score.publisher}</td>
              <td className="px-3 py-3">{score.note}</td>
              <td className="px-3 py-3">{score.part.map((val) => { return val.part_id }).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table >
      <Pagenation total={scoreLength} />
    </div>
  )
}