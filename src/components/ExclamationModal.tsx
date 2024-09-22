import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { sendScoreDestroy } from "@/hooks/backend";
import Modal from "react-modal";

interface ExclamationModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scoreId: number;
  scoreName: string;
  pageNum: number;
  setScores: React.Dispatch<React.SetStateAction<ScoreList | null>>
}

interface ScoreList {
  current_page: number;
  data: Array<Score>;
  from: number;
  to: number;
  links: Array<Links>;
  prev_page_url: string | null;
  next_page_url: string | null;
  first_page_url: string;
  last_page_url: string;
  last_page: number;
  path: string;
  per_page: number;
  total: number;
}

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

interface Links {
  active: boolean;
  label: string;
  url: string;
}

// モーダル用カスタマイズスタイル
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    border: "1px solid #000",
    background: "#000",
    marginRight: "-40%",
    padding: "0",
    transform: "translate(-50%, 0)",
    minWidth: "40%",
    maxWidth: "40rem",
    color: "black",
    borderRadius: "5px",
  },
};

Modal.setAppElement("body");

export function ExclamationModal({
  isOpen,
  setIsOpen,
  scoreId,
  scoreName,
  pageNum,
  setScores,
}: ExclamationModalProps) {
  const router = useRouter();
  // クリックした譜面を削除
  const handleDelete = useCallback(
    async (id: number, page: number) => {
      await sendScoreDestroy(id.toString(), router, page, setScores);
    },
    [router, setScores]
  );

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={customStyles}
      contentLabel="モーダル"
      onRequestClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4 bg-gray-700">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 sm:mx-0 sm:h-10 sm:w-10">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              aria-hidden="true"
              className="h-6 w-6 text-red-600"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-white">
              スコアの削除
            </h3>
            <div className="mt-2">
              <p className="text-sm text-neutral-300">
                「{scoreName}」を削除してもよろしいですか？
                <br />
                （この操作は元に戻せません。）
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-600 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            handleDelete(scoreId, pageNum);
          }}
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          削除
        </button>
        <button
          type="button"
          data-autofocus
          onClick={() => setIsOpen(false)}
          className="mt-3 inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-neutral-400 hover:text-gray-300 shadow-sm sm:mt-0 sm:w-auto"
        >
          キャンセル
        </button>
      </div>
    </Modal>
  );
}
