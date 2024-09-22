import axios from "@/lib/axios";
// import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { LINK_DATA } from "@/constants/linkdata";
import { PER_PAGE } from "@/constants/scoredata";
import { toast, Bounce } from "react-toastify";

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

interface AppRouterInstance {
  push(href: string, options?: NavigateOptions): void;
  refresh(): void;
}

interface NavigateOptions {
  scroll?: boolean;
  page: number;
}

// Score一覧取得
export async function fetchScoreList(
  setScores: React.Dispatch<React.SetStateAction<any>>,
  page: number,
  sort: string,
  order: string,
  query: string
): Promise<any> {
  try {
    // axiosを使用して非同期にデータを取得する
    const response = await axios.get("/api/scores", {
      params: {
        per_page: PER_PAGE,
        page: page,
        sort: sort,
        order: order,
        search: query,
      },
    });
    // レスポンスのデータを戻り値として返す
    setScores(response.data);
  } catch (error) {
    // エラーハンドリング
    console.error("Error fetching data in fetchScoreList:", error);
    throw error; // エラーを再スローする
  }
}

// 新規Score保存
export async function sendScoreCreate(
  params: FormData,
  useRouter: AppRouterInstance
) {
  try {
    // axiosを使用して非同期にデータを送信する
    await axios.post("/api/score", params).then(() => {
      useRouter.push(LINK_DATA.HOME_LINK);
      // トースト表示
      toast.success("追加しました", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    });
  } catch (error) {
    // エラーハンドリング
    console.error("Error fetching data in sendScoreCreate:", error);
    throw error; // エラーを再スローする
  }
}

// 編集するScore取得
export async function fetchScoreEdit(
  id: string | string[] | undefined,
  setScore: React.Dispatch<React.SetStateAction<any>>
) {
  try {
    // axiosを使用して非同期にデータを取得する
    const response = await axios.get("/api/score/" + id);
    // レスポンスのデータをsetする
    setScore(response.data);
  } catch (error) {
    // エラーハンドリング
    console.error("Error fetching data in fetchScoreEdit:", error);
    throw error; // エラーを再スローする
  }
}

// 編集したScoreデータを反映する
export async function sendScoreStore(
  id: string | string[] | undefined,
  params: FormData,
  useRouter: AppRouterInstance,
  pageNum: number
) {
  try {
    // 送信するパラメータを構築
    const requestBody = {
      name: params.get("name"),
      composer: params.get("composer"),
      arranger: params.get("arranger"),
      publisher: params.get("publisher"),
      note: params.get("note"),
      part: params.getAll("part[]"),
      user_id: params.get("user_id"),
    };
    // axiosを使用して非同期にデータを送信する
    await axios.patch("/api/score/" + id, requestBody).then(() => {
      useRouter.push(LINK_DATA.HOME_LINK, { page: pageNum });
      // トースト表示
      toast.success("更新しました", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    });
  } catch (error) {
    // エラーハンドリング
    console.error("Error fetching data in sendScoreStore:", error);
    throw error; // エラーを再スローする
  }
}

// Scoreを削除する
export async function sendScoreDestroy(
  id: string | string[] | undefined,
  useRouter: AppRouterInstance,
  pageNum: number,
  setScores: React.Dispatch<React.SetStateAction<ScoreList | null>>
) {
  try {
    // axiosを使用して非同期にデータを送信する
    await axios.delete("/api/score/" + id).then(() => {
      useRouter.push(LINK_DATA.HOME_LINK, { page: pageNum });// データの再取得を手動で実行
      fetchScoreList(setScores, pageNum, "", "desc", "");
      // トースト表示
      toast.success("削除しました", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    });
  } catch (error) {
    // エラーハンドリング
    console.error("Error fetching data in sendScoreDestroy:", error);
    throw error; // エラーを再スローする
  }
}
