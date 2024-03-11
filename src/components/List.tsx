'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { Pagenation } from "@/components/Pagenation";
import { useScoreList } from "@/hooks/backend";
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

  const { scores, error } = useScoreList();

  const scoreLength = scores ? scores.length : 0;

  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b border-neutral-700 text-left text-neutral-400">
            <th scope="col" className="px-3 py-3"></th>
            <th scope="col" className="px-3 py-3">曲名</th>
            <th scope="col" className="px-3 py-3">作曲者</th>
            <th scope="col" className="px-3 py-3">編曲者</th>
            <th scope="col" className="px-3 py-3">出版社</th>
            <th scope="col" className="px-3 py-3">備考</th>
            <th scope="col" className="px-3 py-3">不足パート譜</th>
            <th scope="col" className="px-3 py-3">
              <span className="">操作</span>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {scores && scores.map((score: Score) => (
            <tr className="border-b border-neutral-700 hover:bg-neutral-900" key={score.id}>
              <td className="px-3 py-3 w-0">
                <input id="selecter" name={'selecter' + score.id} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"></input>
              </td>
              <td className="px-3 py-3">{score.name}</td>
              <td className="px-3 py-3">{score.composer}</td>
              <td className="px-3 py-3">{score.arranger}</td>
              <td className="px-3 py-3">{score.publisher}</td>
              <td className="px-3 py-3">{score.note}</td>
              <td className="px-3 py-3">{score.part.map((val) => { return val.part_id }).join(', ')}</td>
              <td className="px-3 py-3">
                <Link
                  href={'/edit/' + score.id}
                  className="px-1.5 py-1.5 text-neutral-400 hover:text-white"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <a href="#" className="px-1.5 py-1.5 text-neutral-400 hover:text-white">
                  <FontAwesomeIcon icon={faTrashCan} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table >
      <Pagenation total={scoreLength} />
    </div>
  )
}