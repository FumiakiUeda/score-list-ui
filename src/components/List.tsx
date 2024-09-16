"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { PART_NAME, PUBLISHERS } from "@/constants/scoredata";
import { LINK_DATA } from "@/constants/linkdata";
import { useScoreList } from "@/hooks/backend";
import { Pagenation } from "@/components/Pagenation";
import { Loading } from "@/components/Loading";
import { ExclamationModal } from "@/components/ExclamationModal";
import Link from "next/link";

interface Score {
  id: number;
  name: string;
  composer: string;
  arranger: string;
  publisher: number;
  note: string;
  part: { part_id: number }[];
}

interface User {
  user?: UserObj;
}

type UserObj = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

const parts = PART_NAME;
const publishers = PUBLISHERS;

export function List({ user }: User) {
  const [scores, setScores] = useState(null);

  // ページ番号をクエリから取得
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page");

  // スコアリストを取得してscoresを更新
  useEffect(() => {
    useScoreList(setScores, pageNum);
  }, [pageNum]);

  const scoreLength = scores ? scores.total : 0;

  // モーダル開閉状態
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // モーダルに渡すスコアID
  const [modalScoreId, setModalScoreId] = useState(0);
  // モーダルに渡すスコア名
  const [modalScoreName, setModalScoreName] = useState("");

  if (!scores) {
    return <Loading />;
  }
  if (scores.total == 0) {
    return <p className="text-gray-400">表示する譜面がありません。</p>;
  }
  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b border-neautral-200 dark:border-neutral-700 text-left text-neutral-500 dark:text-neutral-400">
            <th scope="col" className="px-3 py-3">
              曲名
            </th>
            <th scope="col" className="px-3 py-3">
              作曲者
            </th>
            <th scope="col" className="px-3 py-3">
              編曲者
            </th>
            <th scope="col" className="px-3 py-3">
              出版社
            </th>
            <th scope="col" className="px-3 py-3">
              備考
            </th>
            <th scope="col" className="px-3 py-3">
              不足パート譜
            </th>
          </tr>
        </thead>
        <tbody>
          {scores &&
            scores.data.map((score: Score) => (
              <tr
                className="border-b border-neautral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                key={score.id}
              >
                <td className="px-3 py-3">
                  <div>{score.name}</div>
                  <div className="mt-2">
                    <Link
                      href={LINK_DATA.EDIT_LINK + score.id}
                      className="px-1.5 py-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                      title="編集"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    <a
                      href="#"
                      className="px-1.5 py-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                      onClick={() => {
                        setModalScoreId(score.id);
                        setModalScoreName(score.name);
                        setModalIsOpen(true);
                      }}
                      title="削除"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </a>
                  </div>
                </td>
                <td className="px-3 py-3">{score.composer}</td>
                <td className="px-3 py-3">{score.arranger}</td>
                <td className="px-3 py-3">{publishers[score.publisher]}</td>
                <td className="px-3 py-3">{score.note}</td>
                <td className="px-3 py-3">
                  {score.part
                    .map((val) => {
                      return parts[val.part_id];
                    })
                    .join(", ")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagenation total={scoreLength} data={scores} />
      <ExclamationModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} scoreId={modalScoreId} scoreName={modalScoreName} pageNum={pageNum} />
    </div>
  );
}
