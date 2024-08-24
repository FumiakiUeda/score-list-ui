import axios from "@/lib/axios";
import { NextRouter } from "next/router";
import { LINK_DATA } from "@/constants/linkdata";
import { PER_PAGE } from "@/constants/scoredata";

interface Score {
  id: number;
  name: string;
  composer: string;
  arranger: string;
  publisher: number;
  note: string;
  part: { part_id: number }[];
}

// Score一覧取得
export async function useScoreList(
  setScores: React.Dispatch<React.SetStateAction<any>>,
  page: number = 1
): Promise<any> {
  try {
    // axiosを使用して非同期にデータを取得する
    const response = await axios.get(
      "/api/scores/" + PER_PAGE + "?page=" + page
    );
    // レスポンスのデータを戻り値として返す
    setScores(response.data);
  } catch (error) {
    // エラーハンドリング
    console.error("Error fetching data in useScoreList:", error);
    throw error; // エラーを再スローする
  }
}

// 新規Score保存
export async function useScoreCreate(params: FormData, useRouter: NextRouter) {
  try {
    // axiosを使用して非同期にデータを送信する
    await axios.post("/api/score", params).then(() => {
      useRouter.push(LINK_DATA.HOME_LINK);
    });
  } catch (error) {
    // エラーハンドリング
    console.error("Error fetching data in useScoreCreate:", error);
    throw error; // エラーを再スローする
  }
}

// 編集するScore取得
export async function useScoreEdit(
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
    console.error("Error fetching data in useScoreEdit:", error);
    throw error; // エラーを再スローする
  }
}

// 編集したScoreデータを反映する
export async function useScoreStore(
  id: number | number[] | undefined,
  params: FormData,
  useRouter: NextRouter
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
    // axiosを使用して非同期にデータを取得する
    await axios.patch("/api/score/" + id, requestBody).then(() => {
      useRouter.push(LINK_DATA.HOME_LINK);
    });
  } catch (error) {
    // エラーハンドリング
    console.error("Error fetching data in useScoreStore:", error);
    throw error; // エラーを再スローする
  }
}

// Scoreを削除する
export async function useScoreDestroy(
  id: number | number[] | undefined,
  useRouter: NextRouter
) {
  try {
    // axiosを使用して非同期にデータを取得する
    await axios.delete("/api/score/" + id).then(() => {
      useRouter.push(LINK_DATA.HOME_LINK);
    });
  } catch (error) {
    // エラーハンドリング
    console.error("Error fetching data in useScoreDestroy:", error);
    throw error; // エラーを再スローする
  }
}
