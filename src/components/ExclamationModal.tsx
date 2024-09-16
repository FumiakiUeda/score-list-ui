
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useScoreDestroy, useScoreList } from "@/hooks/backend";
import Modal from "react-modal";

interface ExclamationModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scoreId: number;
  scoreName: string;
  pageNum: string;
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
    border: '1px solid #000',
    background: '#000',
    marginRight: "-50%",
    padding: "0",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
    maxWidth: "40rem",
    color: "black",
    borderRadius: "5px",
  },
};

Modal.setAppElement("body");

export function ExclamationModal({ isOpen, setIsOpen, scoreId, scoreName, pageNum }: ExclamationModalProps) {
  const router = useRouter();
  // クリックした譜面を削除
  const handleDelete = useCallback(async (id: number, page: string) => {
    await useScoreDestroy(id, router, page);
    await router.refresh();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={customStyles}
      // className=""
      // portalClassName="bg-opacity-75 bg-black fixed bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      contentLabel="モーダル"
      onRequestClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-gray-700">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 sm:mx-0 sm:h-10 sm:w-10">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              aria-hidden="true"
              className="h-6 w-6 text-red-600"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              スコアの削除
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-neutral-300">
                「{scoreName}」を削除してもよろしいですか？<br />（この操作は元に戻せません。）
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-600">
        <button
          type="button"
          onClick={() => {setIsOpen(false)
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
          className="mt-3 inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-gray-900 hover:text-gray-700 shadow-sm sm:mt-0 sm:w-auto dark:text-neutral-400 dark:hover:text-gray-300"
        >
          キャンセル
        </button>
      </div>
    </Modal>
  );
}
