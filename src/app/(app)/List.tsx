"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { fetchScoreList } from "@/hooks/backend";
import { Pagenation } from "@/components/Pagenation";
import { Loading } from "@/components/Loading";
import { ExclamationModal } from "@/components/ExclamationModal";
import { PART_NAME, PUBLISHERS } from "@/constants/scoredata";
import { LINK_DATA } from "@/constants/linkdata";

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

  // ページ番号や並び替え情報をクエリから取得
  const searchParams = useSearchParams();
  const pageNum = parseInt(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") || "id";
  const order = searchParams.get("order") || "desc";
  const query = searchParams.get("query") || "";

  // 並び替えをしても検索クエリを保持する
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSort = (sort: string, order: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (sort) {
      params.set("sort", sort);
      params.set("order", order);
    } else {
      params.delete("sort");
      params.delete("order");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // スコアリストを取得してscoresを更新
  useEffect(() => {
    const getScores = async () => {
      try {
        await fetchScoreList(setScores, pageNum, sort, order, query);
      } catch (error) {
        console.error("Failed to fetch scores:", error);
      }
    };
    getScores();
  }, [pageNum, sort, order, query]);

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
    <div>
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full min-w-[60rem]">
          <thead>
            <tr className="border-b border-neutral-700 text-left text-neutral-400">
              <th scope="col" className="px-3 py-3 w-5/12">
                <span
                  className="hover:text-white cursor-pointer"
                  title="曲名"
                  onClick={() => {
                    sort == "name" && order == "asc"
                      ? handleSort("name", "desc")
                      : handleSort("name", "asc");
                  }}
                >
                  曲名{sort == "name" ? (order == "asc" ? " ▲" : " ▼") : ""}
                </span>
              </th>
              <th scope="col" className="px-3 py-3 w-1/12">
                <span
                  className="hover:text-white cursor-pointer"
                  title="作曲者"
                  onClick={() => {
                    sort == "composer" && order == "asc"
                      ? handleSort("composer", "desc")
                      : handleSort("composer", "asc");
                  }}
                >
                  作曲者
                  {sort == "composer" ? (order == "asc" ? " ▲" : " ▼") : ""}
                </span>
              </th>
              <th scope="col" className="px-3 py-3 w-1/12">
                <span
                  className="hover:text-white cursor-pointer"
                  title="編曲者"
                  onClick={() => {
                    sort == "arranger" && order == "asc"
                      ? handleSort("arranger", "desc")
                      : handleSort("arranger", "asc");
                  }}
                >
                  編曲者
                  {sort == "arranger" ? (order == "asc" ? " ▲" : " ▼") : ""}
                </span>
              </th>
              <th scope="col" className="px-3 py-3 w-1/12">
                <span
                  className="hover:text-white cursor-pointer"
                  title="出版社"
                  onClick={() => {
                    sort == "publisher" && order == "asc"
                      ? handleSort("publisher", "desc")
                      : handleSort("publisher", "asc");
                  }}
                >
                  出版社
                  {sort == "publisher" ? (order == "asc" ? " ▲" : " ▼") : ""}
                </span>
              </th>
              <th scope="col" className="px-3 py-3 w-2/12">
                備考
              </th>
              <th scope="col" className="px-3 py-3 w-2/12">
                不足パート譜
              </th>
            </tr>
          </thead>
          <tbody>
            {scores &&
              scores.data.map((score: Score) => (
                <tr
                  className="border-b border-neutral-700 hover:bg-neutral-800"
                  key={score.id}
                >
                  <td className="px-3 py-3">
                    <div>{score.name}</div>
                    <div className="mt-2">
                      <Link
                        href={
                          LINK_DATA.EDIT_LINK + score.id + "?page=" + pageNum
                        }
                        className="px-1.5 py-1.5 text-neutral-400 hover:text-white"
                        title="編集"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Link>
                      <a
                        href="#"
                        className="px-1.5 py-1.5 text-neutral-400 hover:text-white"
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
        <ExclamationModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          scoreId={modalScoreId}
          scoreName={modalScoreName}
          pageNum={pageNum}
        />
      </div>
      <Pagenation total={scoreLength} data={scores} sort={sort} order={order} />
    </div>
  );
}
